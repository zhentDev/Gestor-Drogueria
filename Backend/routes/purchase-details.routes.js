const express = require('express');
const router = express.Router();
const purchaseDetailController = require('../controllers/purchase-details.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { 
  createPurchaseDetailValidation,
  updatePurchaseDetailValidation,
  idParamValidation,
  purchaseIdParamValidation
} = require('../validators/purchase-detail.validator');

// All routes require authentication
router.use(authenticateToken);

// Get all details for a specific purchase
router.get('/purchase/:purchaseId', purchaseIdParamValidation, purchaseDetailController.getByPurchaseId);

// CRUD operations 
router.get('/:id', idParamValidation, purchaseDetailController.getById);
router.post('/', createPurchaseDetailValidation, purchaseDetailController.create);
router.put('/:id', idParamValidation, updatePurchaseDetailValidation, purchaseDetailController.update);
router.delete('/:id', idParamValidation, purchaseDetailController.delete);

// Bulk operations (useful for frontend)
router.post('/bulk', purchaseDetailController.createBulk);
router.delete('/purchase/:purchaseId/all', purchaseIdParamValidation, purchaseDetailController.deleteByPurchaseId);

module.exports = router;