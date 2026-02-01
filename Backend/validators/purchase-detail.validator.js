const { body, param } = require('express-validator');

const createPurchaseDetailValidation = [
  body('purchase_id')
    .notEmpty()
    .withMessage('El ID de compra es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de compra inválido'),
  
  body('product_id')
    .notEmpty()
    .withMessage('El ID de producto es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de producto inválido'),
  
  body('batch_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de lote inválido'),
  
  body('quantity')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
  
  body('unit_price')
    .notEmpty()
    .withMessage('El precio unitario es requerido')
    .isFloat({ min: 0 })
    .withMessage('El precio unitario debe ser un número positivo'),
  
  body('expiry_date')
    .optional()
    .isISO8601()
    .withMessage('Fecha de vencimiento inválida')
    .custom((value) => {
      if (value && new Date(value) <= new Date()) {
        throw new Error('La fecha de vencimiento debe ser futura');
      }
      return true;
    }),
  
  body('batch_number')
    .optional()
    .isString()
    .withMessage('El número de lote debe ser texto')
    .isLength({ max: 50 })
    .withMessage('El número de lote no puede exceder 50 caracteres')
];

const updatePurchaseDetailValidation = [
  body('purchase_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de compra inválido'),
  
  body('product_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de producto inválido'),
  
  body('batch_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de lote inválido'),
  
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
  
  body('unit_price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio unitario debe ser un número positivo'),
  
  body('expiry_date')
    .optional()
    .isISO8601()
    .withMessage('Fecha de vencimiento inválida')
    .custom((value) => {
      if (value && new Date(value) <= new Date()) {
        throw new Error('La fecha de vencimiento debe ser futura');
      }
      return true;
    }),
  
  body('batch_number')
    .optional()
    .isString()
    .withMessage('El número de lote debe ser texto')
    .isLength({ max: 50 })
    .withMessage('El número de lote no puede exceder 50 caracteres')
];

const idParamValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido')
];

const purchaseIdParamValidation = [
  param('purchaseId')
    .isInt({ min: 1 })
    .withMessage('ID de compra inválido')
];

module.exports = {
  createPurchaseDetailValidation,
  updatePurchaseDetailValidation,
  idParamValidation,
  purchaseIdParamValidation
};