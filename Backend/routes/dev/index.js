// routes/dev/index.js
const express = require('express');
const devController = require('../../controllers/dev.controller');

const router = express.Router();

router.post('/populate', devController.populateDb);
router.post('/reset-db', devController.resetDb);
router.post('/venta', devController.sell);
router.post('/compra', devController.buy);

module.exports = router;
