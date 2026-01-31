const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchases.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { 
  createPurchaseValidation, 
  updatePurchaseValidation,
  idParamValidation 
} = require('../validators/purchase.validator');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.get('/', purchaseController.getAll);
router.get('/:id', idParamValidation, purchaseController.getById);
router.post('/', createPurchaseValidation, purchaseController.create);
router.put('/:id', idParamValidation, updatePurchaseValidation, purchaseController.update);
router.delete('/:id', idParamValidation, purchaseController.delete);

module.exports = router;