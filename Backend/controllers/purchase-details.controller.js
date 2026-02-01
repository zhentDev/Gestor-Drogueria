const { validationResult } = require('express-validator');
const purchaseDetailService = require('../services/purchase-details.service');
const AppError = require('../utils/appError.utils');
const catchAsync = require('../utils/catchAsync.utils');

class PurchaseDetailController {
  // GET /api/purchase-details/purchase/:purchaseId
  getByPurchaseId = catchAsync(async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { purchaseId } = req.params;
    const details = await purchaseDetailService.getByPurchaseId(purchaseId);
    
    res.json({
      success: true,
      message: 'Detalles de compra obtenidos exitosamente',
      data: details
    });
  });

  // GET /api/purchase-details/:id
  getById = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const detail = await purchaseDetailService.getById(id);
    
    res.json({
      success: true,
      message: 'Detalle de compra obtenido exitosamente',
      data: detail
    });
  });

  // POST /api/purchase-details
  create = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const detail = await purchaseDetailService.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Detalle de compra creado exitosamente',
      data: detail
    });
  });

  // POST /api/purchase-details/bulk
  createBulk = catchAsync(async (req, res) => {
    const { purchase_id, details } = req.body;

    if (!purchase_id || !Array.isArray(details) || details.length === 0) {
      throw AppError.badRequest(
        'Se requiere purchase_id y un array de detalles',
        null,
        'BAD_REQUEST'
      );
    }

    const createdDetails = await purchaseDetailService.createBulk(purchase_id, details);
    
    res.status(201).json({
      success: true,
      message: `${createdDetails.length} detalles creados exitosamente`,
      data: createdDetails
    });
  });

  // PUT /api/purchase-details/:id
  update = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    const detail = await purchaseDetailService.update(id, req.body);
    
    res.json({
      success: true,
      message: 'Detalle de compra actualizado exitosamente',
      data: detail
    });
  });

  // DELETE /api/purchase-details/:id
  delete = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { id } = req.params;
    await purchaseDetailService.delete(id);
    
    res.json({
      success: true,
      message: 'Detalle de compra eliminado exitosamente',
      data: null
    });
  });

  // DELETE /api/purchase-details/purchase/:purchaseId/all
  deleteByPurchaseId = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { purchaseId } = req.params;
    const count = await purchaseDetailService.deleteByPurchaseId(purchaseId);
    
    res.json({
      success: true,
      message: `${count} detalles eliminados exitosamente`,
      data: { deletedCount: count }
    });
  });
}

module.exports = new PurchaseDetailController();