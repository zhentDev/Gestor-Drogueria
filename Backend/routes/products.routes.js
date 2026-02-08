const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { createProductValidation, updateProductValidation } = require('../validators/product.validator');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', createProductValidation, productController.create);
router.put('/:id', updateProductValidation, productController.update);
router.delete('/:id', productController.delete);
router.patch('/:id/toggle-status', productController.toggleStatus);

module.exports = router;
