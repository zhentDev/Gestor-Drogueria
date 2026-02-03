const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sales.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { 
  createSaleValidation, 
  updateSaleValidation,
  idParamValidation,
  completeSaleValidation
} = require('../validators/sale.validator');

// All routes require authentication
router.use(authenticateToken);

router.get('/', saleController.getAll);
router.get('/:id', idParamValidation, saleController.getById);
router.post('/', createSaleValidation, saleController.create);
router.put('/:id', idParamValidation, updateSaleValidation, saleController.update);
router.delete('/:id', idParamValidation, saleController.delete);

// Additional useful endpoints
router.post('/complete', completeSaleValidation, saleController.completeSale);
router.get('/daily/summary', saleController.getDailySummary);
router.get('/customer/:customerId', idParamValidation, saleController.getByCustomer);

module.exports = router;