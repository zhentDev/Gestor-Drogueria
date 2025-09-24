// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { loginValidation, changePasswordValidation } = require('../validators/auth.validator');

// Rutas públicas
router.post('/login', loginValidation, authController.login);
router.post('/refresh', authController.refreshToken);

// Rutas protegidas
router.use(authenticateToken);
router.get('/me', authController.me);
router.post('/change-password', changePasswordValidation, authController.changePassword);
router.post('/logout', authController.logout);

module.exports = router;