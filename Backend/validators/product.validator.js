const { body } = require('express-validator');

exports.createProductValidation = [
  body('barcode')
    .notEmpty().withMessage('El código de barras es obligatorio')
    .isString().withMessage('El código de barras debe ser texto')
    .isLength({ max: 50 }).withMessage('El código de barras no puede exceder los 50 caracteres'),
  
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio')
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 300 }).withMessage('El nombre no puede exceder los 300 caracteres'),
  
  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser texto'),
  
  body('category_id')
    .optional()
    .isInt().withMessage('El ID de categoría debe ser un número entero'),
  
  body('manufacturer_id')
    .optional()
    .isInt().withMessage('El ID del fabricante debe ser un número entero'),
  
  body('invima_registry')
    .optional()
    .isString().withMessage('El registro Invima debe ser texto')
    .isLength({ max: 50 }).withMessage('El registro Invima no puede exceder los 50 caracteres'),
  
  body('requires_prescription')
    .optional()
    .isBoolean().withMessage('Requiere prescripción debe ser booleano'),
  
  body('location')
    .optional()
    .isString().withMessage('La ubicación debe ser texto')
    .isLength({ max: 100 }).withMessage('La ubicación no puede exceder los 100 caracteres')
];

exports.updateProductValidation = [
  body('barcode')
    .optional()
    .isString().withMessage('El código de barras debe ser texto')
    .isLength({ max: 50 }).withMessage('El código de barras no puede exceder los 50 caracteres'),
  
  body('name')
    .optional()
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 300 }).withMessage('El nombre no puede exceder los 300 caracteres'),
  
  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser texto'),
  
  body('category_id')
    .optional()
    .isInt().withMessage('El ID de categoría debe ser un número entero'),
  
  body('manufacturer_id')
    .optional()
    .isInt().withMessage('El ID del fabricante debe ser un número entero'),
  
  body('invima_registry')
    .optional()
    .isString().withMessage('El registro Invima debe ser texto')
    .isLength({ max: 50 }).withMessage('El registro Invima no puede exceder los 50 caracteres'),
  
  body('requires_prescription')
    .optional()
    .isBoolean().withMessage('Requiere prescripción debe ser booleano'),
  
  body('location')
    .optional()
    .isString().withMessage('La ubicación debe ser texto')
    .isLength({ max: 100 }).withMessage('La ubicación no puede exceder los 100 caracteres')
];
