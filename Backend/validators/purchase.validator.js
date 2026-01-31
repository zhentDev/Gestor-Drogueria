const { body, param } = require('express-validator');

const createPurchaseValidation = [
  body('supplier_id')
    .notEmpty()
    .withMessage('El proveedor es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de proveedor inválido'),
  
  body('purchase_date')
    .optional()
    .isISO8601()
    .withMessage('Fecha de compra inválida'),
  
  body('subtotal')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Subtotal debe ser un número decimal válido'),
  
  body('tax')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Impuesto debe ser un número decimal válido'),
  
  body('discount')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Descuento debe ser un número decimal válido'),
  
  body('total')
    .notEmpty()
    .withMessage('El total es requerido')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Total debe ser un número decimal válido'),
  
  body('payment_method')
    .optional()
    .isIn(['efectivo', 'tarjeta', 'transferencia', 'credito'])
    .withMessage('Método de pago inválido'),
  
  body('status')
    .optional()
    .isIn(['pendiente', 'completada', 'cancelada'])
    .withMessage('Estado inválido'),
  
  body('notes')
    .optional()
    .isString()
    .withMessage('Las notas deben ser texto')
];

const updatePurchaseValidation = [
  body('supplier_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de proveedor inválido'),
  
  body('purchase_date')
    .optional()
    .isISO8601()
    .withMessage('Fecha de compra inválida'),
  
  body('subtotal')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Subtotal debe ser un número decimal válido'),
  
  body('tax')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Impuesto debe ser un número decimal válido'),
  
  body('discount')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Descuento debe ser un número decimal válido'),
  
  body('total')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Total debe ser un número decimal válido'),
  
  body('payment_method')
    .optional()
    .isIn(['efectivo', 'tarjeta', 'transferencia', 'credito'])
    .withMessage('Método de pago inválido'),
  
  body('status')
    .optional()
    .isIn(['pendiente', 'completada', 'cancelada'])
    .withMessage('Estado inválido'),
  
  body('notes')
    .optional()
    .isString()
    .withMessage('Las notas deben ser texto')
];

const idParamValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido')
];

module.exports = {
  createPurchaseValidation,
  updatePurchaseValidation,
  idParamValidation
};