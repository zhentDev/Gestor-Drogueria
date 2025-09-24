class AppError extends Error {
  /**
   * @param {string} message
   * @param {number} statusCode
   * @param {object|array|null} errors
   * @param {string|null} code - short machine code like 'USER_NOT_FOUND'
   * @param {boolean} isOperational
   */
  constructor(message, statusCode = 500, errors = null, code = null, isOperational = true) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errors = errors || null;
    this.code = code || null;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
    this.date = new Date().toISOString();
  }

  // Helpers estáticos
  static badRequest(message = 'Bad Request', errors = null, code = 'BAD_REQUEST') {
    return new AppError(message, 400, errors, code, true);
  }

  static unauthorized(message = 'Unauthorized', errors = null, code = 'UNAUTHORIZED') {
    return new AppError(message, 401, errors, code, true);
  }

  static notFound(message = 'Not Found', errors = null, code = 'NOT_FOUND') {
    return new AppError(message, 404, errors, code, true);
  }

  static internal(message = 'Internal Server Error', errors = null, code = 'INTERNAL') {
    return new AppError(message, 500, errors, code, false);
  }
}

module.exports = AppError;