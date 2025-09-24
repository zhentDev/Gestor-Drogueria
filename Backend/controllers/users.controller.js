// controllers/user.controller.js
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/appError.utils');

class UserController {
  getAll = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await userService.getAllUsers(page, limit, search);
    res.json({ success: true, data: result });
  });

  getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json({ success: true, data: user });
  });

  create = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, message: 'Usuario creado correctamente', data: user });
  });

  update = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array());
    }
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    res.json({ success: true, message: 'Usuario actualizado correctamente', data: user });
  });

  delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (parseInt(id, 10) === req.user.id) {
      throw AppError.badRequest('No puedes eliminar tu propia cuenta');
    }
    const result = await userService.deleteUser(id);
    res.json({ success: true, message: result.message });
  });

  toggleStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (parseInt(id, 10) === req.user.id) {
      throw AppError.badRequest('No puedes cambiar el estado de tu propia cuenta');
    }
    const result = await userService.toggleUserStatus(id);
    res.json({ success: true, message: result.message, data: { is_active: result.is_active } });
  });
}

module.exports = new UserController();
