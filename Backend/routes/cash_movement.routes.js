const express = require('express');
const router = express.Router();
const cashMovementController = require('../controllers/cash_movement.controller');
const { validateMovement } = require('../validators/cash_movement.validator');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.use(authenticateToken);

router.post('/', validateMovement, cashMovementController.createMovement);
router.get('/register/:registerId', cashMovementController.getByRegister);

module.exports = router;
