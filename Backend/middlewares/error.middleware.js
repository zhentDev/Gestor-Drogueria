// middlewares/error.middleware.js
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/appError.utils');

// Mapea errores como antes (solo lógica mínima aquí)
const mapError = (err) => {
  let status = 500;
  let message = 'Internal Server Error';
  let errors = null;
  let code = null;
  let isOperational = false;

  if (err instanceof AppError) {
    status = err.statusCode || 500;
    message = err.message || message;
    errors = err.errors || null;
    code = err.code || null;
    isOperational = !!err.isOperational;
    return { status, message, errors, code, isOperational };
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    status = 400;
    message = 'Validation Error';
    errors = (err.errors || []).map(e => ({ field: e.path || e.field || null, message: e.message }));
    code = 'VALIDATION_ERROR';
    isOperational = true;
    return { status, message, errors, code, isOperational };
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    status = 400;
    message = 'Relacion con registro inexistente o restricción de clave foránea';
    code = 'FOREIGN_KEY_VIOLATION';
    isOperational = true;
    return { status, message, errors, code, isOperational };
  }

  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expirado';
    code = 'TOKEN_EXPIRED';
    isOperational = true;
    return { status, message, errors, code, isOperational };
  }

  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Token inválido';
    code = 'TOKEN_INVALID';
    isOperational = true;
    return { status, message, errors, code, isOperational };
  }

  if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'JSON inválido en la solicitud';
    code = 'BAD_JSON';
    isOperational = true;
    return { status, message, errors, code, isOperational };
  }

  // Si el error ya trae statusCode explícito (compatibilidad)
  if (err.statusCode || err.status) {
    status = err.statusCode || err.status || status;
    message = err.message || message;
    isOperational = true;
    return { status, message, errors, code, isOperational };
  }

  return { status, message, errors, code, isOperational };
};

const errorMiddleware = (err, req, res, next) => {
  // Generar un id para correlacionar logs <-> respuesta
  const errorId = uuidv4();

  // Loggear internamente (aquí puedes usar winston/pino/Sentry)
  // En desarrollo puedes loggear todo; en produccion loggear stack y req info pero no enviarlo al cliente.
  if (process.env.NODE_ENV === 'development') {
    // detalle completo en dev
    console.error(`[${errorId}] Error (dev):`, err);
  } else {
    // en prod solo loguear lo necesario; el stack se guarda en logs externos
    console.error(`[${errorId}] ${err.message}`);
    // opcional: enviar a Sentry/otro servicio aquí
  }

  // Mapear a payload seguro
  const { status, message, errors, code } = mapError(err);

  // Respuesta pública — NUNCA incluir raw ni stack en producción
  const payload = {
    success: false,
    status: String(status).startsWith('4') ? 'fail' : 'error',
    message,
    code: code || null,
    errors: errors || null,
    date: new Date().toISOString(),
    errorId // id para que el frontend/reportes puedan pedir más info si es necesario
  };

  // In dev, opcionalmente incluir stack para debug local. No incluir raw.
  if (process.env.NODE_ENV === 'development') {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
};

module.exports = errorMiddleware;
