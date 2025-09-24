// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../utils/appError.utils');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(AppError.unauthorized('Token de acceso requerido'));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findOne({
      where: { id: decoded.userId, is_active: true },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return next(AppError.unauthorized('Usuario no válido o inactivo'));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(AppError.unauthorized('Token expirado'));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(AppError.unauthorized('Token inválido'));
    }
    return next(error); // pasa al handler global
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(AppError.unauthorized('Acceso denegado. Se requieren permisos de administrador'));
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin
};
