// routes/dev/index.js
const express = require('express');
const devController = require('../../controllers/dev.controller');

const router = express.Router();

// Endpoints de gestión de BD
router.post('/populate', devController.populateDb);
router.post('/reset', devController.resetDb);
router.get('/stats', devController.getStats);

// Endpoints de prueba de transacciones
router.post('/sale', devController.sell);
router.post('/purchase', devController.buy);

module.exports = router;