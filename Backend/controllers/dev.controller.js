// controllers/dev.controller.js
const devService = require('../services/dev.services');

exports.populateDb = async (req, res, next) => {
  try {
    const result = await devService.populateDb();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.resetDb = async (req, res, next) => {
  try {
    const result = await devService.resetDb();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.sell = async (req, res, next) => {
  try {
    const result = await devService.createTestSale();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.buy = async (req, res, next) => {
  try {
    const result = await devService.createTestPurchase();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const result = await devService.getStats();
    res.json(result);
  } catch (err) {
    next(err);
  }
};  