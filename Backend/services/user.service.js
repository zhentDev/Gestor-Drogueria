// services/user.service.js
const { User } = require('../models');
const { Op, fn, col, where } = require('sequelize');
const AppError = require('../utils/appError.utils');

class UserService {
  async getAllUsers(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit;

    // búsqueda compatible con SQLite (case-insensitive)
    const whereClause = search ? {
      [Op.or]: [
        where(fn('LOWER', col('username')), { [Op.like]: `%${search.toLowerCase()}%` }),
        where(fn('LOWER', col('full_name')), { [Op.like]: `%${search.toLowerCase()}%` }),
        where(fn('LOWER', col('email')), { [Op.like]: `%${search.toLowerCase()}%` })
      ]
    } : {};

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit, 10),
      offset,
      order: [['created_at', 'DESC']]
    });

    return {
      users: rows,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        pages: Math.ceil(count / limit)
      }
    };
  }

  async getUserById(id) { 
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw AppError.notFound('Usuario no encontrado', 'USER_NOT_FOUND');
    }

    return user;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
  
    if (!user) {
      throw AppError.notFound('Usuario no encontrado', 'USER_NOT_FOUND');
    }
  
    return user;
  }

  async createUser(userData) {
    // Verificar si el username o email ya existen
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: userData.username },
          ...(userData.email ? [{ email: userData.email }] : [])
        ]
      }
    });

    if (existingUser) {
      throw AppError.badRequest('El username o email ya están en uso', null, 'USER_EXISTS');
    }

    const user = await User.create(userData);
    const { password, ...userWithoutPassword } = user.toJSON();

    return userWithoutPassword;
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw AppError.notFound('Usuario no encontrado', 'USER_NOT_FOUND');
    }

    // Si se está actualizando username o email, verificar unicidad
    if (userData.username || userData.email) {
      const whereClause = {
        id: { [Op.ne]: id }
      };

      if (userData.username) {
        whereClause.username = userData.username;
      }

      if (userData.email) {
        whereClause.email = userData.email;
      }

      const existingUser = await User.findOne({ where: whereClause });
      if (existingUser) {
        throw AppError.badRequest('El username o email ya están en uso', null, 'USER_EXISTS');
      }
    }

    const updated = await user.update(userData);
    const { password, ...userWithoutPassword } = updated.toJSON();

    return userWithoutPassword;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw AppError.notFound('Usuario no encontrado', 'USER_NOT_FOUND');
    }

    // Soft delete - marcar como inactivo
    const updated = await user.update({ is_active: false });

    return { message: 'Usuario desactivado correctamente', is_active: updated.is_active };
  }

  async toggleUserStatus(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw AppError.notFound('Usuario no encontrado', 'USER_NOT_FOUND');
    }

    const updated = await user.update({ is_active: !user.is_active });

    return {
      message: `Usuario ${updated.is_active ? 'activado' : 'desactivado'} correctamente`,
      is_active: updated.is_active
    };
  }
}

module.exports = new UserService();
