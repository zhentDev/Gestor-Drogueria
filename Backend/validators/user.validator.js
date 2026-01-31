const { body } = require('express-validator');

const createUserValidation = [
  body('tipo_doc')
    .isIn(['CC', 'NIT', 'CE', 'PAS'])
    .withMessage('Tipo de documento debe ser CC, NIT, CE o PAS')
    .notEmpty()
    .withMessage('Tipo de documento es requerido'),
  
  body('num_doc')
    .isLength({ min: 5, max: 20 })
    .withMessage('Número de documento debe tener entre 5 y 20 caracteres')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Número de documento solo puede contener letras y números')
    .notEmpty()
    .withMessage('Número de documento es requerido'),

  body('username')
    .optional() // Ahora es opcional, se puede derivar
    .isLength({ min: 3, max: 50 })
    .withMessage('Username debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username solo puede contener letras, números y guiones bajos'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número')
    .notEmpty()
    .withMessage('Contraseña es requerida'),
  
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre debe tener entre 2 y 100 caracteres')
    .notEmpty()
    .withMessage('Nombre es requerido'),

  body('last_name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Apellido debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .optional() // Ahora es opcional
    .isEmail() 
    .withMessage('Email debe ser válido'),
  
  body('address')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Dirección no puede exceder los 255 caracteres'),

  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Teléfono no puede exceder los 20 caracteres')
    .matches(/^[0-9+]+$/)
    .withMessage('Teléfono solo puede contener números y el signo "+"'),

  body('role')
    .isIn(['admin', 'vendedor', 'cajero'])
    .withMessage('Rol debe ser: admin, vendedor o cajero')
    .notEmpty() // Mantener rol como requerido
    .withMessage('Rol es requerido')
];

const updateUserValidation = [
  body('tipo_doc')
    .optional()
    .isIn(['CC', 'NIT', 'CE', 'PAS'])
    .withMessage('Tipo de documento debe ser CC, NIT, CE o PAS'),
  
  body('num_doc')
    .optional()
    .isLength({ min: 5, max: 20 })
    .withMessage('Número de documento debe tener entre 5 y 20 caracteres')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Número de documento solo puede contener letras y números'),

  body('username')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username debe tener entre 3 y 50 caracteres'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre debe tener entre 2 y 100 caracteres'),
  
  body('last_name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Apellido debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email debe ser válido'),
  
  body('address')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Dirección no puede exceder los 255 caracteres'),

  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Teléfono no puede exceder los 20 caracteres')
    .matches(/^[0-9+]+$/)
    .withMessage('Teléfono solo puede contener números y el signo "+"'),
  
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