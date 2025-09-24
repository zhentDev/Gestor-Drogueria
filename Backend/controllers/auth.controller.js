// controllers/auth.controller.js
const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/appError.utils');

class AuthController {
  // POST /auth/login
  login = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { username, password } = req.body;
    const result = await authService.login(username, password);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: result
    });
  });

  // POST /auth/change-password
  changePassword = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw AppError.badRequest('Datos de entrada inválidos', errors.array(), 'BAD_REQUEST');
    }

    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    res.json({
      success: true,
      message: result.message
    });
  });

  // POST /auth/refresh
  refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw AppError.badRequest('Refresh token requerido', null, 'REFRESH_TOKEN_REQUIRED');
    }


    const result = await authService.refresh(refreshToken);

    res.json({
      success: true,
      data: result
    });
  });

  // GET /auth/me
  me = catchAsync(async (req, res) => {
    const user = await authService.getMe(req.user.id);

    res.json({
      success: true,
      data: user
    });
  });

  // POST /auth/logout
  logout = catchAsync(async (req, res) => {
    // Solo recibimos el refreshToken en el body
    const { refreshToken } = req.body;

  
    // Invalida el refreshToken en la base de datos
    await authService.logout(refreshToken,req.user.id);
  
    // Respondemos
    res.json({
      success: true,
      message: 'Logout exitoso'
    });
  });
}
module.exports = new AuthController();
