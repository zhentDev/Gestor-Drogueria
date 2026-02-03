const {
  Sale,
  Customer,
  User,
  CashRegister,
  SaleDetail,
  Product,
  ProductPresentation,
  ProductBatch,
} = require('../models');
const AppError = require('../utils/appError.utils');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

class SaleService {
  getAll() {
    return Sale.findAll({
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'full_name', 'email', 'phone'],
        },
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        {
          model: CashRegister,
          as: 'cashRegister',
          attributes: ['id', 'notes', 'status'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  async getById(id) {
    const sale = await Sale.findByPk(id, {
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'full_name', 'email', 'phone', 'address'],
        },
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        {
          model: CashRegister,
          as: 'cashRegister',
          attributes: ['id', 'notes', 'status'],
        },
        {
          model: SaleDetail,
          as: 'saleDetails',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'location'],
            },
            {
              model: ProductPresentation,
              as: 'presentation',
              attributes: ['id', 'unit_type_id', 'units_per_presentation'],
            },
            {
              model: ProductBatch,
              as: 'batch',
              attributes: ['id', 'batch_number', 'expiry_date'],
            },
          ],
        },
      ],
    });

    if (!sale) throw new AppError('Venta no encontrada', 404);
    return sale;
  }

  async create(data) {
    if (data.customer_id) {
      await this._validateCustomer(data.customer_id);
    }
    if (data.cash_register_id) {
      await this._validateCashRegister(data.cash_register_id);
    }

    const sale = await Sale.create({
      ...data,
      invoice_number: await this._generateInvoice(),
    }).catch((e) => {
      throw new AppError(e.message, 500);
    });
    console.log('sale', sale);
    return this.getById(sale.id);
  }

  async completeSale(data) {
    const transaction = await sequelize.transaction();

    try {
      const {
        details,
        customer_id,
        cash_register_id,
        payment_method,
        amount_paid,
        discount = 0,
        tax = 0,
        notes,
        user_id,
      } = data;

      // Validate customer if provided
      if (customer_id) {
        await this._validateCustomer(customer_id);
      }

      // Validate cash register if provided
      if (cash_register_id) {
        await this._validateCashRegister(cash_register_id);
      }

      // Calculate totals
      let subtotal = 0;
      for (const detail of details) {
        await this._validateProduct(detail.product_id);
        await this._validateProductPresentation(detail.product_presentation_id);

        const itemDiscount = detail.discount || 0;
        const itemSubtotal = detail.quantity * detail.unit_price - itemDiscount;
        subtotal += itemSubtotal;
      }

      const total = subtotal + tax - discount;

      // Validate payment
      if (amount_paid < total) {
        throw new AppError('El monto pagado es insuficiente', 400);
      }

      const change_amount = amount_paid - total;

      // Create sale
      const sale = await Sale.create(
        {
          customer_id: customer_id || null,
          user_id,
          cash_register_id: cash_register_id || null,
          invoice_number: await this._generateInvoice(),
          sale_date: new Date(),
          subtotal,
          tax,
          discount,
          total,
          payment_method,
          amount_paid,
          change_amount,
          status: 'completada',
          notes: notes || null,
        },
        { transaction },
      );

      // Create sale details
      for (const detail of details) {

        const itemDiscount = detail.discount || 0;
        const itemSubtotal = detail.quantity * detail.unit_price - itemDiscount;

        await SaleDetail.create(
          {
            sale_id: sale.id,
            product_id: detail.product_id,
            product_presentation_id: detail.product_presentation_id,
            batch_id: detail.batch_id || null,
            quantity: detail.quantity,
            unit_price: detail.unit_price,
            discount: itemDiscount,
            subtotal: itemSubtotal,
          },
          { transaction },
        );

        // Update inventory (if you have inventory control)
        // await this._updateInventory(detail.product_id, detail.quantity, transaction);
      }

      await transaction.commit();
      return this.getById(sale.id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id, data) {
    const sale = await Sale.findByPk(id);
    if (!sale) throw new AppError('Venta no encontrada', 404);

    if (sale.status === 'completada') {
      throw new AppError('No se puede modificar una venta completada', 400);
    }

    if (data.customer_id) {
      await this._validateCustomer(data.customer_id);
    }
    if (data.cash_register_id) {
      await this._validateCashRegister(data.cash_register_id);
    }

    await sale.update(data).catch((e) => {
      throw new AppError(e.message, 500);
    });

    return this.getById(id);
  }

  async delete(id) {
    const sale = await Sale.findByPk(id);
    if (!sale) throw new AppError('Venta no encontrada', 404);

    if (sale.status === 'completada') {
      throw new AppError('No se puede eliminar una venta completada', 400);
    }

    await sale.destroy();
    return true;
  }

  async getDailySummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sales = await Sale.findAll({
      where: {
        sale_date: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
        status: 'completada',
      },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_sales'],
        [sequelize.fn('SUM', sequelize.col('total')), 'total_amount'],
        [sequelize.fn('SUM', sequelize.col('subtotal')), 'total_subtotal'],
        [sequelize.fn('SUM', sequelize.col('tax')), 'total_tax'],
        [sequelize.fn('SUM', sequelize.col('discount')), 'total_discount'],
      ],
      raw: true,
    });

    return {
      date: today.toISOString().split('T')[0],
      ...sales[0],
    };
  }

  async getByCustomer(customerId) {
    await this._validateCustomer(customerId);

    return Sale.findAll({
      where: { customer_id: customerId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        {
          model: CashRegister,
          as: 'cashRegister',
          attributes: ['id', 'notes'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  /* ---------- Helpers ---------- */

  async _validateCustomer(id) {
    if (!(await Customer.findByPk(id))) {
      throw new AppError('Cliente no encontrado', 404);
    }
  }

  async _validateCashRegister(id) {
    const cashRegister = await CashRegister.findByPk(id);
    if (!cashRegister) {
      throw new AppError('Caja registradora no encontrada', 404);
    }
    if (cashRegister.status !== 'open') {
      throw new AppError('La caja registradora debe tener estado open', 400);
    }
  }

  async _validateProduct(id) {
    if (!(await Product.findByPk(id))) {
      throw new AppError('Producto no encontrado', 404);
    }
  }

  async _validateProductPresentation(id) {
    if (!(await ProductPresentation.findByPk(id))) {
      throw new AppError('Presentación de producto no encontrada', 404);
    }
  }

  async _generateInvoice() {
    const prefix = 'SALE';
    const ym = new Date().toISOString().slice(0, 7).replace('-', '');
    const last = await Sale.findOne({
      where: { invoice_number: { [Op.like]: `${prefix}-${ym}%` } },
      order: [['invoice_number', 'DESC']],
    });

    const seq = last ? +last.invoice_number.slice(-4) + 1 : 1;
    return `${prefix}-${ym}${String(seq).padStart(4, '0')}`;
  }
}

module.exports = new SaleService();
