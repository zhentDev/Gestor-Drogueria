const { Product } = require('../models');
const { Op, fn, col, where } = require('sequelize');
const AppError = require('../utils/appError.utils');

class ProductService {
  async getAllProducts(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit;
    const whereClause = { is_active: true };

    if (search) {
      Object.assign(whereClause, {
        [Op.or]: [
          where(fn('LOWER', col('name')), { [Op.like]: `%${search.toLowerCase()}%` }),
          where(fn('LOWER', col('barcode')), { [Op.like]: `%${search.toLowerCase()}%` })
        ]
      });
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset,
      order: [['created_at', 'DESC']]
    });

    return {
      products: rows,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        pages: Math.ceil(count / limit)
      }
    };
  }

  async getProductById(id) {
    const product = await Product.findByPk(id);
    
    if (!product || !product.is_active) {
      throw AppError.notFound('Producto no encontrado', 'PRODUCT_NOT_FOUND');
    }

    return product;
  }

  async createProduct(productData) {
    // Check if barcode already exists
    const existingProduct = await Product.findOne({
      where: { barcode: productData.barcode }
    });

    if (existingProduct) {
      if (existingProduct.is_active) {
        throw AppError.badRequest('Ya existe un producto con este código de barras', null, 'PRODUCT_EXISTS');
      } else {
        // Reactivate product if it was soft deleted (optional strategy, but common)
        // For now, we will throw error to avoid confusion, or we could update it. 
        // Let's stick to throwing error as per standard CRUD, user might want to manually reactivate or change logic.
         throw AppError.badRequest('Ya existe un producto inactivo con este código de barras', null, 'PRODUCT_EXISTS');
      }
    }

    const product = await Product.create(productData);
    return product;
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);

    if (!product || !product.is_active) {
      throw AppError.notFound('Producto no encontrado', 'PRODUCT_NOT_FOUND');
    }

    // Check unique barcode if it's being changed
    if (productData.barcode && productData.barcode !== product.barcode) {
      const existingProduct = await Product.findOne({
        where: { barcode: productData.barcode }
      });
      if (existingProduct) {
        throw AppError.badRequest('Ya existe un producto con este código de barras', null, 'PRODUCT_EXISTS');
      }
    }

    const updatedProduct = await product.update(productData);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);

    if (!product) {
       throw AppError.notFound('Producto no encontrado', 'PRODUCT_NOT_FOUND');
    }

    // Soft delete
    await product.update({ is_active: false });
    return { message: 'Producto eliminado correctamente' };
  }

  async toggleProductStatus(id) {
    const product = await Product.findByPk(id);
    
    if (!product) {
      throw AppError.notFound('Producto no encontrado', 'PRODUCT_NOT_FOUND');
    }

    const updatedProduct = await product.update({ is_active: !product.is_active });
    return { 
      message: `Producto ${updatedProduct.is_active ? 'activado' : 'desactivado'} correctamente`,
      is_active: updatedProduct.is_active
    };
  }
}

module.exports = new ProductService();
