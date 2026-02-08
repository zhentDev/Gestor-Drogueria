const cashMovementService = require('../services/cash_movement.service');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/appError.utils');

exports.createMovement = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw AppError.badRequest('Datos de entrada inválidos', errors.array());
  }
  const movement = await cashMovementService.create(req.user.id, req.body);
  res.status(201).json(movement);
});

exports.getByRegister = catchAsync(async (req, res, next) => {
  const movements = await cashMovementService.getByRegister(req.params.registerId);
  res.json(movements);
});
