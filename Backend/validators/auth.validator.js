// validators/auth.validator.js
const { body } = require('express-validator');

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username o email es requerido')
    .isLength({ min: 3 })
    .withMessage('Username debe tener al menos 3 caracteres'),
  
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