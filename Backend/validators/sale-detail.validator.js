const { body, param } = require('express-validator');

const createSaleDetailValidation = [
  body('sale_id')
    .notEmpty()
    .withMessage('El ID de venta es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de venta inválido'),
  
  body('product_id')
    .notEmpty()
    .withMessage('El ID de producto es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de producto inválido'),
  
  body('product_presentation_id')
    .notEmpty()
    .withMessage('El ID de presentación es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de presentación inválido'),
  
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
  
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El descuento debe ser un número positivo')
];

const updateSaleDetailValidation = [
  body('sale_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de venta inválido'),
  
  body('product_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de producto inválido'),
  
  body('product_presentation_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de presentación inválido'),
  
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
  
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El descuento debe ser un número positivo')
];

const idParamValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido')
];

const saleIdParamValidation = [
  param('saleId')
    .isInt({ min: 1 })
    .withMessage('ID de venta inválido')
];

module.exports = {
  createSaleDetailValidation,
  updateSaleDetailValidation,
  idParamValidation,
  saleIdParamValidation
};