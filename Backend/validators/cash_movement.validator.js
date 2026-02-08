const { body } = require('express-validator');


exports.validateMovement = [
  body('amount')
    .exists().withMessage('El monto es requerido')
    .isFloat({ min: 0.01 }).withMessage('El monto debe ser positivo'),
  body('movement_type')
    .exists().withMessage('El tipo de movimiento es requerido')
    .isIn(['entry', 'exit', 'expense', 'sale']).withMessage('Tipo de movimiento no válido. (entry, exit, expense, sale)'),
  body('concept')
    .exists().withMessage('El concepto es requerido')
    .isString().withMessage('El concepto debe ser texto'),
  body('notes')
    .optional()
    .isString()
];
