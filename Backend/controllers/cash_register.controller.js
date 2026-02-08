const cashRegisterService = require('../services/cash_register.service');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/appError.utils');

exports.openRegister = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const register = await cashRegisterService.openRegister(req.user.id, req.body);
    res.status(201).json(register);
});

exports.closeRegister = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const register = await cashRegisterService.closeRegister(req.params.id, req.user.id, req.body);
    res.json(register);
});

exports.updateRegister = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const register = await cashRegisterService.updateRegister(req.params.id, req.user.id, req.body);
    res.json(register);
});

exports.getStatus = catchAsync(async (req, res, next) => {
    const register = await cashRegisterService.getCurrent(req.user.id);
    if (!register) {
        return res.json({ status: 'closed', message: 'No hay caja abierta' });
    }
    res.json(register);
});

exports.getHistory = catchAsync(async (req, res, next) => {
    const result = await cashRegisterService.getHistory(req.query);
    res.json(result);
});

exports.getById = catchAsync(async (req, res, next) => {
    const register = await cashRegisterService.getById(req.params.id);
    if (!register) throw AppError.notFound('Caja no encontrada');
    res.json(register);
});
