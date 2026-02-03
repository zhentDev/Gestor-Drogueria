const { validationResult } = require('express-validator');
const saleDetailService = require('../services/sale-details.service');
const AppError = require('../utils/appError.utils');
const catchAsync = require('../utils/catchAsync.utils');

class SaleDetailController {
  // GET /api/sale-details/sale/:saleId
  getBySaleId = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { saleId } = req.params;
    const details = await saleDetailService.getBySaleId(saleId);
    
    res.json({
      success: true,
      message: 'Detalles de venta obtenidos exitosamente',
      data: details
    });
  });

  // GET /api/sale-details/:id
  getById = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const detail = await saleDetailService.getById(id);
    
    res.json({
      success: true,
      message: 'Detalle de venta obtenido exitosamente',
      data: detail
    });
  });

  // POST /api/sale-details
  create = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const detail = await saleDetailService.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Detalle de venta creado exitosamente',
      data: detail
    });
  });

  // POST /api/sale-details/bulk
  createBulk = catchAsync(async (req, res) => {
    const { sale_id, details } = req.body;

    if (!sale_id || !Array.isArray(details) || details.length === 0) {
      throw AppError.badRequest(
        'Se requiere sale_id y un array de detalles',
        null,
        'BAD_REQUEST'
      );
    }

    const createdDetails = await saleDetailService.createBulk(sale_id, details);
    
    res.status(201).json({
      success: true,
      message: `${createdDetails.length} detalles creados exitosamente`,
      data: createdDetails
    });
  });

  // PUT /api/sale-details/:id
  update = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const detail = await saleDetailService.update(id, req.body);
    
    res.json({
      success: true,
      message: 'Detalle de venta actualizado exitosamente',
      data: detail
    });
  });

  // DELETE /api/sale-details/:id
  delete = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    await saleDetailService.delete(id);
    
    res.json({
      success: true,
      message: 'Detalle de venta eliminado exitosamente',
      data: null
    });
  });

  // DELETE /api/sale-details/sale/:saleId/all
  deleteBySaleId = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { saleId } = req.params;
    const count = await saleDetailService.deleteBySaleId(saleId);
    
    res.json({
      success: true,
      message: `${count} detalles eliminados exitosamente`,
      data: { deletedCount: count }
    });
  });
}

module.exports = new SaleDetailController();