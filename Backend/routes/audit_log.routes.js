const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/audit_log.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Protect all routes
router.use(authenticateToken);

router.get('/', auditLogController.getLogs);

module.exports = router;
