const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Maicol' }, { id: 2, name: 'Juan' }]);
});

router.post('/', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'Usuario creado', user: newUser });
});

module.exports = router;
