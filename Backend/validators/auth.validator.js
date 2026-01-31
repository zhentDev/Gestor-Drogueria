// validators/auth.validator.js
const { body } = require('express-validator');

const loginValidation = [
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
  
  body('password')
    .notEmpty()
    .withMessage('Contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
];


const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Contraseña actual es requerida'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La nueva contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número'),
  
  body('confirmPassword')
    .notEmpty()
    .withMessage('Se requiere confirmar la nueva contraseña')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    })
];

module.exports = {
  loginValidation,
  changePasswordValidation
};