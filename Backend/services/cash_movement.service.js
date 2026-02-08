const { CashMovement, CashRegister, User } = require('../models');
const { sequelize } = require('../models');

class CashMovementService {
  async create(userId, data) {
    const t = await sequelize.transaction();

    try {
      // 1. Find active register
      const register = await CashRegister.findOne({
        where: {
          user_id: userId,
          status: 'open'
        },
        transaction: t
      });

      if (!register) {
        throw new Error('No tienes una caja abierta para realizar movimientos.');
      }

      // 2. Create Movement
      const movement = await CashMovement.create({
        cash_register_id: register.id,
        user_id: userId,
        movement_type: data.movement_type,
        concept: data.concept,
        amount: data.amount,
        notes: data.notes,
        sale_id: data.sale_id || null
      }, { transaction: t });

      // 3. Update Register Totals
      // Assumption: 'entry', 'sale' -> Add to income (sales_total for now)
      // 'exit', 'expense' -> Add to expenses (expenses_total)
      
      const amount = parseFloat(data.amount);

      if (['entry', 'sale'].includes(data.movement_type)) {
        await register.increment('sales_total', { by: amount, transaction: t });
      } else if (['exit', 'expense'].includes(data.movement_type)) {
        await register.increment('expenses_total', { by: amount, transaction: t });
      }

      await t.commit();
      return movement;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getByRegister(registerId) {
    return await CashMovement.findAll({
      where: { cash_register_id: registerId },
      order: [['movement_date', 'DESC']],
      include: [{
        model: User,
        as: 'cashMovementUser', // Check alias in index.js: 'cashMovementUser'
        attributes: ['id', 'username']
      }]
    });
  }
}

module.exports = new CashMovementService();
