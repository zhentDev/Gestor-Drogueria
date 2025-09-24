// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { authenticateToken, requireAdmin } = require('../middlewares/auth.middleware');
const { createUserValidation, updateUserValidation } = require('../validators/user.validator');

// Todas las rutas requieren autenticación y permisos de admin
router.use(authenticateToken, requireAdmin);

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', createUserValidation, userController.create);
router.put('/:id', updateUserValidation, userController.update);
router.delete('/:id', userController.delete);
router.patch('/:id/toggle-status', userController.toggleStatus);

module.exports = router;