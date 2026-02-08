const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customers.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { createCustomerValidation, updateCustomerValidation } = require('../validators/customer.validator');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.post('/', createCustomerValidation, customerController.create);
router.put('/:id', updateCustomerValidation, customerController.update);
router.delete('/:id', customerController.delete);
router.patch('/:id/toggle-status', customerController.toggleStatus);

module.exports = router;
