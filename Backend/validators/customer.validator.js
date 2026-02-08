const { body } = require('express-validator');

exports.createCustomerValidation = [
  body('document_number')
    .notEmpty().withMessage('El número de documento es obligatorio')
    .isString().withMessage('El número de documento debe ser texto')
    .isLength({ max: 20 }).withMessage('El número de documento no puede exceder los 20 caracteres'),
  
  body('full_name')
    .notEmpty().withMessage('El nombre completo es obligatorio')
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 200 }).withMessage('El nombre no puede exceder los 200 caracteres'),
  
  body('document_type')
    .optional()
    .isString().withMessage('El tipo de documento debe ser texto')
    .isLength({ max: 20 }).withMessage('El tipo de documento no puede exceder los 20 caracteres'),

  body('phone')
    .optional()
    .isString().withMessage('El teléfono debe ser texto')
    .isLength({ max: 20 }).withMessage('El teléfono no puede exceder los 20 caracteres'),

  body('email')
    .optional()
    .isEmail().withMessage('El correo electrónico no es válido')
    .isLength({ max: 100 }).withMessage('El correo electrónico no puede exceder los 100 caracteres'),
  
  body('address')
    .optional()
    .isString().withMessage('La dirección debe ser texto'),
  
  body('birth_date')
    .optional()
    .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida')
];

exports.updateCustomerValidation = [
  body('document_number')
    .optional()
    .isString().withMessage('El número de documento debe ser texto')
    .isLength({ max: 20 }).withMessage('El número de documento no puede exceder los 20 caracteres'),
  
  body('full_name')
    .optional()
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ max: 200 }).withMessage('El nombre no puede exceder los 200 caracteres'),
  
  body('document_type')
    .optional()
    .isString().withMessage('El tipo de documento debe ser texto')
    .isLength({ max: 20 }).withMessage('El tipo de documento no puede exceder los 20 caracteres'),

  body('phone')
    .optional()
    .isString().withMessage('El teléfono debe ser texto')
    .isLength({ max: 20 }).withMessage('El teléfono no puede exceder los 20 caracteres'),

  body('email')
    .optional()
    .isEmail().withMessage('El correo electrónico no es válido')
    .isLength({ max: 100 }).withMessage('El correo electrónico no puede exceder los 100 caracteres'),
  
  body('address')
    .optional()
    .isString().withMessage('La dirección debe ser texto'),
  
  body('birth_date')
    .optional()
    .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida')
];
