const { validationResult } = require('express-validator');
const saleService = require('../services/sales.service');
const AppError = require('../utils/appError.utils');
const catchAsync = require('../utils/catchAsync.utils');

class SaleController {
  // GET /api/sales
  getAll = catchAsync(async (req, res) => {
    const sales = await saleService.getAll();
    
    res.json({
      success: true,
      message: 'Ventas obtenidas exitosamente',
      data: sales
    });
  });

  // GET /api/sales/:id
  getById = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const sale = await saleService.getById(id);
    
    res.json({
      success: true,
      message: 'Venta obtenida exitosamente',
      data: sale
    });
  });

  // POST /api/sales
  create = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    // user_id comes from authentication token
    const saleData = {
      ...req.body,
      user_id: req.user.id
    };

    const sale = await saleService.create(saleData);
    
    res.status(201).json({
      success: true,
      message: 'Venta creada exitosamente',
      data: sale
    });
  });

  // POST /api/sales/complete
  completeSale = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const saleData = {
      ...req.body,
      user_id: req.user.id
    };

    const sale = await saleService.completeSale(saleData);
    
    res.status(201).json({
      success: true,
      message: 'Venta completada exitosamente',
      data: sale
    });
  });

  // PUT /api/sales/:id
  update = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const sale = await saleService.update(id, req.body);
    
    res.json({
      success: true,
      message: 'Venta actualizada exitosamente',
      data: sale
    });
  });

  // DELETE /api/sales/:id
  delete = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    await saleService.delete(id);
    
    res.json({
      success: true,
      message: 'Venta eliminada exitosamente',
      data: null
    });
  });

  // GET /api/sales/daily/summary
  getDailySummary = catchAsync(async (req, res) => {
    const summary = await saleService.getDailySummary();
    
    res.json({
      success: true,
      message: 'Resumen diario obtenido exitosamente',
      data: summary
    });
  });

  // GET /api/sales/customer/:customerId
  getByCustomer = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { customerId } = req.params;
    const sales = await saleService.getByCustomer(customerId);
    
    res.json({
      success: true,
      message: 'Ventas del cliente obtenidas exitosamente',
      data: sales
    });
  });
}

module.exports = new SaleController();