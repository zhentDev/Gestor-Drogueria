const { AuditLog, User } = require('../models');

class AuditLogService {
  async create(data) {
    try {
      return await AuditLog.create(data);
    } catch (error) {
      throw error;
    }
  }

  async findAll(params = {}) {
    const { page = 1, limit = 10, userId, action, startDate, endDate } = params;
    const offset = (page - 1) * limit;
    const where = {};

    if (userId) where.user_id = userId;
    if (action) where.action = action;
    
    // Add date range filter if provided
    if (startDate && endDate) {
      where.created_at = {
        [require('sequelize').Op.between]: [startDate, endDate]
      };
    }

    try {
      const { count, rows } = await AuditLog.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['created_at', 'DESC']],
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email']
        }]
      });

      return {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        data: rows
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuditLogService();
