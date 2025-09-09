const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authService = require('../services/auth.service');
const auditService = require('../services/audit.service');

// Login
router.post('/login', [
  body('username').notEmpty().withMessage('Username es requerido'),
  body('password').notEmpty().withMessage('Password es requerido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const result = await authService.login(username, password);

    // Registrar en auditoría
    await auditService.log({
      user_id: result.user.id,
      action: 'LOGIN',
      entity: 'users',
      entity_id: result.user.id,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Refresh Token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    await authService.logout(token);
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;