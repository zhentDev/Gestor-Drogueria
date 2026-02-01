const { PurchaseDetail, Purchase, Product, ProductBatch } = require('../models');
const AppError = require('../utils/appError.utils');
const sequelize = require('../config/database');

class PurchaseDetailService {
  async getByPurchaseId(purchaseId) {
    await this._validatePurchaseExists(purchaseId);

    return PurchaseDetail.findAll({
      where: { purchase_id: purchaseId },
      include: [
        { 
          model: Product, 
          as: 'product', 
          attributes: ['id', 'name', 'invima_registry', 'category_id', 'created_at'] 
        },
        { 
          model: ProductBatch, 
          as: 'batch', 
          attributes: ['id', 'batch_number', 'expiry_date', 'quantity'] 
        }
      ],
      order: [['id', 'ASC']]
    });
  }

  async getById(id) {
    const detail = await PurchaseDetail.findByPk(id, {
      include: [
        { 
          model: Product, 
          as: 'product', 
          attributes: ['id', 'name', 'invima_registry', 'category_id', 'created_at'] 
        },
        { 
          model: ProductBatch, 
          as: 'batch', 
          attributes: ['id', 'batch_number', 'expiry_date', 'quantity'] 
        },
        {
          model: Purchase,
          as: 'purchase',
          attributes: ['id', 'invoice_number', 'status', 'purchase_date']
        }
      ]
    });

    if (!detail) {
      throw new AppError('Detalle de compra no encontrado', 404);
    }

    return detail;
  }

  async create(data) {
    // Validate that purchase is in 'pendiente' status
    await this._validatePurchasePendiente(data.purchase_id);
    
    // Validate product exists
    await this._validateProductExists(data.product_id);
    
    // Validate batch if provided
    if (data.batch_id) {
      await this._validateBatchExists(data.batch_id);
    }

    // Calculate subtotal
    const subtotal = this._calculateSubtotal(data.quantity, data.unit_price);

    const detail = await PurchaseDetail.create({
      ...data,
      subtotal
    }).catch(e => {
      throw new AppError(e.message, 500);
    });

    return this.getById(detail.id);
  }

  async createBulk(purchaseId, details) {
    // Validate purchase is in 'pendiente' status
    await this._validatePurchasePendiente(purchaseId);

    const transaction = await sequelize.transaction();

    try {
      const createdDetails = [];

      for (const detailData of details) {
        // Validate product
        await this._validateProductExists(detailData.product_id);
        
        // Validate batch if provided
        if (detailData.batch_id) {
          await this._validateBatchExists(detailData.batch_id);
        }

        // Calculate subtotal
        const subtotal = this._calculateSubtotal(
          detailData.quantity, 
          detailData.unit_price
        );

        const detail = await PurchaseDetail.create({
          purchase_id: purchaseId,
          product_id: detailData.product_id,
          batch_id: detailData.batch_id || null,
          quantity: detailData.quantity,
          unit_price: detailData.unit_price,
          subtotal,
          expiry_date: detailData.expiry_date || null,
          batch_number: detailData.batch_number || null
        }, { transaction });

        createdDetails.push(detail);
      }

      await transaction.commit();
      
      // Return full details with relationships
      return this.getByPurchaseId(purchaseId);
    } catch (error) {
      await transaction.rollback();
      throw new AppError(error.message, 500);
    }
  }

  async update(id, data) {
    const detail = await PurchaseDetail.findByPk(id);
    
    if (!detail) {
      throw new AppError('Detalle de compra no encontrado', 404);
    }

    // Validate that purchase is still in 'pendiente' status
    await this._validatePurchasePendiente(detail.purchase_id);

    // Validate product if being changed
    if (data.product_id && data.product_id !== detail.product_id) {
      await this._validateProductExists(data.product_id);
    }

    // Validate batch if being changed
    if (data.batch_id && data.batch_id !== detail.batch_id) {
      await this._validateBatchExists(data.batch_id);
    }

    // Recalculate subtotal if quantity or price changed
    if (data.quantity || data.unit_price) {
      const quantity = data.quantity || detail.quantity;
      const unitPrice = data.unit_price || detail.unit_price;
      data.subtotal = this._calculateSubtotal(quantity, unitPrice);
    }

    await detail.update(data).catch(e => {
      throw new AppError(e.message, 500);
    });

    return this.getById(id);
  }

  async delete(id) {
    const detail = await PurchaseDetail.findByPk(id);
    
    if (!detail) {
      throw new AppError('Detalle de compra no encontrado', 404);
    }

    // Validate that purchase is still in 'pendiente' status
    await this._validatePurchasePendiente(detail.purchase_id);

    await detail.destroy();
    return true;
  }

  async deleteByPurchaseId(purchaseId) {
    // Validate that purchase is still in 'pendiente' status
    await this._validatePurchasePendiente(purchaseId);

    const count = await PurchaseDetail.destroy({
      where: { purchase_id: purchaseId }
    });

    return count;
  }

  /* ---------- Helper methods ---------- */

  async _validatePurchaseExists(purchaseId) {
    const purchase = await Purchase.findByPk(purchaseId);
    if (!purchase) {
      throw new AppError('Compra no encontrada', 404);
    }
    return purchase;
  }

  async _validatePurchasePendiente(purchaseId) {
    const purchase = await this._validatePurchaseExists(purchaseId);
    
    if (purchase.status !== 'pendiente') {
      throw new AppError(
        'Solo se pueden modificar detalles de compras con estado pendiente',
        400
      );
    }
    
    return purchase;
  }

  async _validateProductExists(productId) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError('Producto no encontrado', 404);
    }
    return product;
  }

  async _validateBatchExists(batchId) {
    const batch = await ProductBatch.findByPk(batchId);
    if (!batch) {
      throw new AppError('Lote no encontrado', 404);
    }
    return batch;
  }

  _calculateSubtotal(quantity, unitPrice) {
    return (parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2);
  }
}

module.exports = new PurchaseDetailService();