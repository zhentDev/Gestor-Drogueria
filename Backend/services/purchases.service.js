const { Purchase, Supplier, User } = require('../models');
const AppError = require('../utils/appError.utils');
const { Op } = require('sequelize');

class PurchaseService {
  async getAll() {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'email', 'phone'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return purchases;
  }

  async getById(id) {
    const purchase = await Purchase.findByPk(id, {
      include: [
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'email', 'phone', 'address'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email'],
        },
      ],
    });

    if (!purchase) {
      throw new AppError('Compra no encontrada', 404);
    }

    return purchase;
  }

  async create(purchaseData) {
    // Verificar que el proveedor existe
    const supplier = await Supplier.findByPk(purchaseData.supplier_id);
    if (!supplier) {
      throw new AppError('Proveedor no encontrado', 404);
    }

    // Generar número de factura único
    const invoiceNumber = await this.generateInvoiceNumber();
    try {
      const purchase = await Purchase.create({
        ...purchaseData,
        invoice_number: invoiceNumber,
      });
    } catch (err) {
      throw new AppError(`Error creando la compra- (${err.message})`, 500);
    }
    // Retornar con las relaciones incluidas
    return await this.getById(purchase.id);
  }

  async update(id, updateData) {
    const purchase = await Purchase.findByPk(id);

    if (!purchase) {
      throw new AppError('Compra no encontrada', 404);
    }

    // Verificar proveedor si se está actualizando
    if (updateData.supplier_id) {
      const supplier = await Supplier.findByPk(updateData.supplier_id);
      if (!supplier) {
        throw new AppError('Proveedor no encontrado', 404);
      }
    }

    try {
      await purchase.update(updateData);
    } catch (err) {
      throw new AppError(`Error actualizando la compra- (${err.message})`, 500);
    }
    // Retornar con las relaciones incluidas
    return await this.getById(purchase.id);
  }

  async delete(id) {
    const purchase = await Purchase.findByPk(id);

    if (!purchase) {
      throw new AppError('Compra no encontrada', 404);
    }

    // Verificar si la compra puede ser eliminada según su estado
    if (purchase.status === 'completada') {
      throw new AppError('No se puede eliminar una compra completada', 400);
    }

    await purchase.destroy();
    return true;
  }

  // Método auxiliar para generar número de factura
  async generateInvoiceNumber() {
    const prefix = 'PUR';
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Buscar la última compra del mes
    const lastPurchase = await Purchase.findOne({
      where: {
        invoice_number: {
          [Op.like]: `${prefix}-${year}${month}%`,
        },
      },
      order: [['invoice_number', 'DESC']],
    });

    let sequential = 1;
    if (lastPurchase && lastPurchase.invoice_number) {
      const lastNumber = lastPurchase.invoice_number.split('-')[1];
      sequential = parseInt(lastNumber.slice(6)) + 1;
    }

    return `${prefix}-${year}${month}${String(sequential).padStart(4, '0')}`;
  }
}

module.exports = new PurchaseService();
