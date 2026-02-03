const { SaleDetail, Sale, Product, ProductPresentation, Batch } = require('../models');
const AppError = require('../utils/appError.utils');
const sequelize = require('../config/database');

class SaleDetailService {
  async getBySaleId(saleId) {
    await this._validateSaleExists(saleId);

    return SaleDetail.findAll({
      where: { sale_id: saleId },
      include: [
        { 
          model: Product, 
          as: 'product', 
          attributes: ['id', 'name', 'sku', 'category'] 
        },
        { 
          model: ProductPresentation, 
          as: 'presentation', 
          attributes: ['id', 'name', 'price', 'quantity'] 
        },
        { 
          model: Batch, 
          as: 'batch', 
          attributes: ['id', 'batch_number', 'expiry_date', 'quantity'] 
        }
      ],
      order: [['id', 'ASC']]
    });
  }

  async getById(id) {
    const detail = await SaleDetail.findByPk(id, {
      include: [
        { 
          model: Product, 
          as: 'product', 
          attributes: ['id', 'name', 'sku', 'category', 'description'] 
        },
        { 
          model: ProductPresentation, 
          as: 'presentation', 
          attributes: ['id', 'name', 'price', 'quantity'] 
        },
        { 
          model: Batch, 
          as: 'batch', 
          attributes: ['id', 'batch_number', 'expiry_date', 'quantity'] 
        },
        {
          model: Sale,
          as: 'sale',
          attributes: ['id', 'invoice_number', 'status', 'sale_date', 'total']
        }
      ]
    });

    if (!detail) {
      throw new AppError('Detalle de venta no encontrado', 404);
    }

    return detail;
  }

  async create(data) {
    // Validate that sale is in 'pendiente' status
    await this._validateSalePendiente(data.sale_id);
    
    // Validate product exists
    await this._validateProductExists(data.product_id);
    
    // Validate product presentation exists
    await this._validateProductPresentationExists(data.product_presentation_id);
    
    // Validate batch if provided
    if (data.batch_id) {
      await this._validateBatchExists(data.batch_id);
    }

    // Calculate subtotal
    const discount = data.discount || 0;
    const subtotal = this._calculateSubtotal(data.quantity, data.unit_price, discount);

    const detail = await SaleDetail.create({
      ...data,
      discount,
      subtotal
    }).catch(e => {
      throw new AppError(e.message, 500);
    });

    return this.getById(detail.id);
  }

  async createBulk(saleId, details) {
    // Validate sale is in 'pendiente' status
    await this._validateSalePendiente(saleId);

    const transaction = await sequelize.transaction();

    try {
      const createdDetails = [];

      for (const detailData of details) {
        // Validate product
        await this._validateProductExists(detailData.product_id);
        
        // Validate product presentation
        await this._validateProductPresentationExists(detailData.product_presentation_id);
        
        // Validate batch if provided
        if (detailData.batch_id) {
          await this._validateBatchExists(detailData.batch_id);
        }

        // Calculate subtotal
        const discount = detailData.discount || 0;
        const subtotal = this._calculateSubtotal(
          detailData.quantity, 
          detailData.unit_price,
          discount
        );

        const detail = await SaleDetail.create({
          sale_id: saleId,
          product_id: detailData.product_id,
          product_presentation_id: detailData.product_presentation_id,
          batch_id: detailData.batch_id || null,
          quantity: detailData.quantity,
          unit_price: detailData.unit_price,
          discount,
          subtotal
        }, { transaction });

        createdDetails.push(detail);
      }

      await transaction.commit();
      
      // Return full details with relationships
      return this.getBySaleId(saleId);
    } catch (error) {
      await transaction.rollback();
      throw new AppError(error.message, 500);
    }
  }

  async update(id, data) {
    const detail = await SaleDetail.findByPk(id);
    
    if (!detail) {
      throw new AppError('Detalle de venta no encontrado', 404);
    }

    // Validate that sale is still in 'pendiente' status
    await this._validateSalePendiente(detail.sale_id);

    // Validate product if being changed
    if (data.product_id && data.product_id !== detail.product_id) {
      await this._validateProductExists(data.product_id);
    }

    // Validate product presentation if being changed
    if (data.product_presentation_id && data.product_presentation_id !== detail.product_presentation_id) {
      await this._validateProductPresentationExists(data.product_presentation_id);
    }

    // Validate batch if being changed
    if (data.batch_id && data.batch_id !== detail.batch_id) {
      await this._validateBatchExists(data.batch_id);
    }

    // Recalculate subtotal if quantity, price, or discount changed
    if (data.quantity || data.unit_price || data.discount !== undefined) {
      const quantity = data.quantity || detail.quantity;
      const unitPrice = data.unit_price || detail.unit_price;
      const discount = data.discount !== undefined ? data.discount : detail.discount;
      data.subtotal = this._calculateSubtotal(quantity, unitPrice, discount);
    }

    await detail.update(data).catch(e => {
      throw new AppError(e.message, 500);
    });

    return this.getById(id);
  }

  async delete(id) {
    const detail = await SaleDetail.findByPk(id);
    
    if (!detail) {
      throw new AppError('Detalle de venta no encontrado', 404);
    }

    // Validate that sale is still in 'pendiente' status
    await this._validateSalePendiente(detail.sale_id);

    await detail.destroy();
    return true;
  }

  async deleteBySaleId(saleId) {
    // Validate that sale is still in 'pendiente' status
    await this._validateSalePendiente(saleId);

    const count = await SaleDetail.destroy({
      where: { sale_id: saleId }
    });

    return count;
  }

  /* ---------- Helper methods ---------- */

  async _validateSaleExists(saleId) {
    const sale = await Sale.findByPk(saleId);
    if (!sale) {
      throw new AppError('Venta no encontrada', 404);
    }
    return sale;
  }

  async _validateSalePendiente(saleId) {
    const sale = await this._validateSaleExists(saleId);
    
    if (sale.status !== 'pendiente') {
      throw new AppError(
        'Solo se pueden modificar detalles de ventas con estado pendiente',
        400
      );
    }
    
    return sale;
  }

  async _validateProductExists(productId) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }
    return product;
  }

  async _validateProductPresentationExists(presentationId) {
    const presentation = await ProductPresentation.findByPk(presentationId);
    if (!presentation) {
      throw new AppError('Presentación de producto no encontrada', 404);
    }
    return presentation;
  }

  async _validateBatchExists(batchId) {
    const batch = await Batch.findByPk(batchId);
    if (!batch) {
      throw new AppError('Lote no encontrado', 404);
    }
    return batch;
  }

  _calculateSubtotal(quantity, unitPrice, discount = 0) {
    const subtotal = (parseFloat(quantity) * parseFloat(unitPrice)) - parseFloat(discount);
    return parseFloat(subtotal.toFixed(2));
  }
}

module.exports = new SaleDetailService();