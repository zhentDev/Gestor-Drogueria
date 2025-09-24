const { body } = require('express-validator');

const createUserValidation = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username solo puede contener letras, números y guiones bajos'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número'),
  
  body('full_name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre completo debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .optional()
    .isEmail() 
    .withMessage('Email debe ser válido'),
  
  body('role')
    .isIn(['admin', 'vendedor', 'cajero'])
    .withMessage('Rol debe ser: admin, vendedor o cajero')
];

const updateUserValidation = [
  body('username')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username debe tener entre 3 y 50 caracteres'),
  
  body('full_name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre completo debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email debe ser válido'),
  
  body('role')
    .optional()
    .isIn(['admin', 'vendedor', 'cajero'])
    .withMessage('Rol debe ser: admin, vendedor o cajero'),

  body('password')
  .optional()
  .isLength({ min: 6 })
  .withMessage('Contraseña debe tener al menos 6 caracteres')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage('Contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número'),

];
module.exports = {
    createUserValidation,
    updateUserValidation
  };