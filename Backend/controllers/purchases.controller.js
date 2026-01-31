const { validationResult } = require('express-validator');
const purchaseService = require('../services/purchases.service');
const AppError = require('../utils/appError.utils');
const catchAsync = require('../utils/catchAsync.utils');

class PurchaseController {
  // GET /api/purchases
  getAll = catchAsync(async (req, res) => {
    const purchases = await purchaseService.getAll();
    
    res.json({
      success: true,
      message: 'Compras obtenidas exitosamente',
      data: purchases
    });
  });

  // GET /api/purchases/:id
  getById = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const purchase = await purchaseService.getById(id);
    
    res.json({
      success: true,
      message: 'Compra obtenida exitosamente',
      data: purchase
    });
  });

  // POST /api/purchases
  create = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    // El user_id se obtiene del token de autenticación
    const purchaseData = {
      ...req.body,
      user_id: req.user.userId
    };

    const purchase = await purchaseService.create(purchaseData);
    
    res.status(201).json({
      success: true,
      message: 'Compra creada exitosamente',
      data: purchase
    });
  });

  // PUT /api/purchases/:id
  update = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const purchase = await purchaseService.update(id, req.body);
    
    res.json({
      success: true,
      message: 'Compra actualizada exitosamente',
      data: purchase
    });
  });

  // DELETE /api/purchases/:id
  delete = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    await purchaseService.delete(id);
    
    res.json({
      success: true,
      message: 'Compra eliminada exitosamente',
      data: null
    });
  });
}

module.exports = new PurchaseController();