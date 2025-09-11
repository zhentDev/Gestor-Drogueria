// middlewares/error.middleware.js
const isProd = process.env.NODE_ENV === 'production';

function mapError(err) {
  // Default
  let status = err.statusCode || err.status || 500;
  let message = err.message || 'Error interno del servidor';
  let errors;

  // Joi (validation library)
  if (err.isJoi) {
    status = 400;
    message = 'Error de validación';
    errors = err.details?.map(d => ({ message: d.message, path: d.path })) || undefined;
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Error de validación en base de datos';
    errors = Object.values(err.errors).map(e => ({ message: e.message, path: e.path }));
  }

  // Sequelize unique / validation
  if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
    status = 400;
    message = 'Error de validación en base de datos';
    errors = err.errors?.map(e => ({ message: e.message, path: e.path }));
  }

  // Jsonwebtoken errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Token inválido';
  }
  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expirado';
  }

  // SyntaxError de JSON.parse / bodyParser
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    status = 400;
    message = 'JSON inválido en el body';
  }

  return { status, message, errors };
}

module.exports = function errorHandler(err, req, res, next) {
  // Aquí podrías enviar a Sentry o a tu logger
  // Example: logger.error(err);

  const { status, message, errors } = mapError(err);

  const payload = {
    success: false,
    message,
  };

  if (errors) payload.errors = errors;
  if (!isProd) {
    payload.stack = err.stack;
    payload.raw = { name: err.name, ...('code' in err ? { code: err.code } : {}) };
  }

  res.status(status).json(payload);
};
