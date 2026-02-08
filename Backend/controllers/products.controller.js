const productService = require('../services/products.service');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/appError.utils');

class ProductController {
  getAll = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await productService.getAllProducts(page, limit, search);
    res.json({ success: true, data: result });
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.json({ success: true, data: product });
  });

  create = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, message: 'Producto creado correctamente', data: product });
  });

  update = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    res.json({ success: true, message: 'Producto actualizado correctamente', data: product });
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    res.json({ success: true, message: result.message });
  });

  toggleStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await productService.toggleProductStatus(id);
    res.json({ success: true, message: result.message, data: { is_active: result.is_active } });
  });
}

module.exports = new ProductController();
