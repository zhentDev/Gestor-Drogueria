const { CashRegister, User } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../utils/appError.utils');

class CashRegisterService {
  async openRegister(userId, data) {
    // Check if user already has an open register
    const activeRegister = await CashRegister.findOne({
      where: {
        user_id: userId,
        status: 'open'
      }
    });

    if (activeRegister) {
      throw AppError.badRequest('Ya tienes una caja abierta. Debes cerrarla antes de abrir una nueva.');
    }

    return await CashRegister.create({
      user_id: userId,
      initial_amount: data.initial_amount,
      notes: data.notes,
      status: 'open',
      opening_date: new Date(),
      sales_total: 0,
      expenses_total: 0
    });
  }

  async closeRegister(id, userId, data) {
    const register = await CashRegister.findOne({
      where: {
        id,
        user_id: userId
      }
    });

    if (!register) {
      throw AppError.notFound('Caja no encontrada o no pertenece al usuario.');
    }

    if (register.status === 'closed') {
      throw AppError.badRequest('Esta caja ya está cerrada.');
    }

    const initial = parseFloat(register.initial_amount);
    const sales = parseFloat(register.sales_total);
    const expenses = parseFloat(register.expenses_total);
    const actual = parseFloat(data.actual_amount);

    const expected = initial + sales - expenses;
    const difference = actual - expected;

    return await register.update({
      closing_date: new Date(),
      status: 'closed',
      actual_amount: actual,
      expected_amount: expected,
      difference: difference,
      notes: data.notes ? `${register.notes || ''}\nCierre: ${data.notes}` : register.notes
    });
  }

  async updateRegister(id, userId, data) {
    const register = await CashRegister.findOne({
      where: {
        id,
        user_id: userId
      }
    });

    if (!register) {
      throw AppError.notFound('Caja no encontrada o no pertenece al usuario.');
    }

    // Allow updating notes at any time.
    // Allow updating initial_amount only if status is open (optional safety) - keeping generic for now but notes is the main target.
    
    const updates = {};
    if (data.notes !== undefined) updates.notes = data.notes;
    
    if (data.initial_amount !== undefined) {
      if (register.status === 'closed') {
        throw AppError.badRequest('No se puede modificar el monto inicial de una caja cerrada.');
      }
      updates.initial_amount = data.initial_amount;
    }

    return await register.update(updates);
  }

  async getCurrent(userId) {
    return await CashRegister.findOne({
      where: {
        user_id: userId,
        status: 'open'
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });
  }

  async getHistory(params) {
    const { page = 1, limit = 10, userId, startDate, endDate } = params;
    const offset = (page - 1) * limit;
    const where = {};

    if (userId) where.user_id = userId;
    if (startDate && endDate) {
      where.opening_date = {
        [Op.between]: [startDate, endDate]
      };
    }

    const { count, rows } = await CashRegister.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['opening_date', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });

    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows
    };
  }

  async getById(id) {
     return await CashRegister.findByPk(id, {
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'username']
        }]
     });
  }
}

module.exports = new CashRegisterService();
