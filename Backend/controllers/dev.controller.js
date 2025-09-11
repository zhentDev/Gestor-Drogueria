// controllers/devController.js
const devService = require('../services/dev.services');

exports.populateDb = async (req, res, next) => {
  try {
    await devService.populateDb();
    res.json({ message: 'Populate: OK' });
  } catch (err) {
    next(err);
  }
};

exports.resetDb = async (req, res, next) => {
  try {
    await devService.resetDb();
    res.json({ message: 'Reset DB: OK' });
  } catch (err) {
    next(err);
  }
};

exports.sell = async (req, res, next) => {
  try {
    // opcional: permitir pasar invoice_number u otros overrides via query/body
    await devService.sell();
    res.json({ message: 'Venta de prueba insertada' });
  } catch (err) {
    next(err);
  }
};

exports.buy = async (req, res, next) => {
  try {
    await devService.buy();
    res.json({ message: 'Compra de prueba insertada' });
  } catch (err) {
    next(err);
  }
};
