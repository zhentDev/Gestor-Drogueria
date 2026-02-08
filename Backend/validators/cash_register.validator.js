const { body, param } = require('express-validator');


exports.validateOpen = [
  body('initial_amount')
    .exists().withMessage('El monto inicial es requerido')
    .isFloat({ min: 0 }).withMessage('El monto inicial debe ser un número positivo'),
  body('notes')
    .optional()
    .isString().withMessage('Las notas deben ser texto')
];

exports.validateClose = [
  param('id')
    .isInt().withMessage('ID de caja inválido'),
  body('actual_amount')
    .exists().withMessage('El monto actual es requerido')
    .isFloat({ min: 0 }).withMessage('El monto actual debe ser un número positivo'),
  body('notes')
    .optional()
    .isString().withMessage('Las notas deben ser texto')
];

exports.validateUpdate = [
  param('id')
    .isInt().withMessage('ID de caja inválido'),
  body('notes')
    .optional()
    .isString().withMessage('Las notas deben ser texto'),
  body('initial_amount')
    .optional()
    .isFloat({ min: 0 }).withMessage('El monto inicial debe ser positivo')
];
