const customerService = require('../services/customers.service');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/appError.utils');

class CustomerController {
  getAll = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await customerService.getAllCustomers(page, limit, search);
    res.json({ success: true, data: result });
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(id);
    res.json({ success: true, data: customer });
  });

  create = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json({ success: true, message: 'Cliente creado correctamente', data: customer });
  });

  update = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const { id } = req.params;
    const customer = await customerService.updateCustomer(id, req.body);
    res.json({ success: true, message: 'Cliente actualizado correctamente', data: customer });
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await customerService.deleteCustomer(id);
    res.json({ success: true, message: result.message });
  });

  toggleStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await customerService.toggleCustomerStatus(id);
    res.json({ success: true, message: result.message, data: { is_active: result.is_active } });
  });
}

module.exports = new CustomerController();
