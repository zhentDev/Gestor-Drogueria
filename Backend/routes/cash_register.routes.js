const express = require('express');
const router = express.Router();
const cashRegisterController = require('../controllers/cash_register.controller');
const { validateOpen, validateClose, validateUpdate } = require('../validators/cash_register.validator');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.use(authenticateToken);

router.post('/open', validateOpen, cashRegisterController.openRegister);
router.post('/close/:id', validateClose, cashRegisterController.closeRegister);
router.put('/:id', validateUpdate, cashRegisterController.updateRegister);
router.get('/status', cashRegisterController.getStatus);
router.get('/history', cashRegisterController.getHistory);
router.get('/:id', cashRegisterController.getById);

module.exports = router;
