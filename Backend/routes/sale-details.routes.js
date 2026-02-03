const express = require('express');
const router = express.Router();
const saleDetailController = require('../controllers/sale-details.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { 
  createSaleDetailValidation,
  updateSaleDetailValidation,
  idParamValidation,
  saleIdParamValidation
} = require('../validators/sale-detail.validator');

// All routes require authentication
router.use(authenticateToken);

// Get all details for a specific sale
router.get('/sale/:saleId', saleIdParamValidation, saleDetailController.getBySaleId);

// CRUD operations
router.get('/:id', idParamValidation, saleDetailController.getById);
router.post('/', createSaleDetailValidation, saleDetailController.create);
router.put('/:id', idParamValidation, updateSaleDetailValidation, saleDetailController.update);
router.delete('/:id', idParamValidation, saleDetailController.delete);

// Bulk operations
router.post('/bulk', saleDetailController.createBulk);
router.delete('/sale/:saleId/all', saleIdParamValidation, saleDetailController.deleteBySaleId);

module.exports = router;