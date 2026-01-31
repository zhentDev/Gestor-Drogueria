// services/user.service.js
const { User } = require('../models');
const { Op, fn, col, where } = require('sequelize');
const AppError = require('../utils/appError.utils');

class UserService {
  async getAllUsers(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit;

    const whereClause = { is_active: true }; // Solo usuarios activos por defecto

    if (search) {
      Object.assign(whereClause, {
        [Op.or]: [
          where(fn('LOWER', col('User.username')), { [Op.like]: `%${search.toLowerCase()}%` }),
          where(fn('LOWER', col('User.full_name')), { [Op.like]: `%${search.toLowerCase()}%` }),
          where(fn('LOWER', col('User.email')), { [Op.like]: `%${search.toLowerCase()}%` }),
          where(fn('LOWER', col('User.num_doc')), { [Op.like]: `%${search.toLowerCase()}%` }) // Buscar por num_doc
        ]
      });
    }

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

    if (!user || !user.is_active) { // Solo usuarios activos
      throw AppError.notFound('Usuario no encontrado o inactivo', 'USER_NOT_FOUND');
    }

    return user;
  }

  async getUserByUsername(usernameOrNumDoc) { // Puede buscar por username o num_doc
    const user = await User.findOne({
      where: { 
        [Op.or]: [{ username: usernameOrNumDoc }, { num_doc: usernameOrNumDoc }],
        is_active: true
      },
      attributes: { exclude: ['password'] }
    });
  
    if (!user) {
      throw AppError.notFound('Usuario no encontrado o inactivo', 'USER_NOT_FOUND');
    }
  
    return user;
  }

  async createUser(userData) {
    // Generar username si no se provee, usando num_doc
    if (!userData.username && userData.num_doc) {
      userData.username = userData.num_doc;
    }
    // Derivar full_name si no se provee, usando name y last_name
    if (!userData.full_name && userData.name) {
      userData.full_name = userData.last_name ? `${userData.name} ${userData.last_name}` : userData.name;
    }

    // Verificar unicidad de username y num_doc
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: userData.username },
          { num_doc: userData.num_doc },
          ...(userData.email ? [{ email: userData.email }] : [])
        ]
      }
    });

    if (existingUser) {
      const field = existingUser.username === userData.username ? 'username' : 
                    existingUser.num_doc === userData.num_doc ? 'número de documento' : 'email';
      throw AppError.badRequest(`El ${field} ya está en uso`, null, 'USER_EXISTS');
    }

    const user = await User.create(userData);
    const { password, ...userWithoutPassword } = user.toJSON();

    return userWithoutPassword;
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user || !user.is_active) {
      throw AppError.notFound('Usuario no encontrado o inactivo', 'USER_NOT_FOUND');
    }

    // Generar full_name si name o last_name cambian o se proveen
    if (userData.name || userData.last_name) {
      const currentName = userData.name || user.name;
      const currentLastName = userData.last_name || user.last_name;
      userData.full_name = currentLastName ? `${currentName} ${currentLastName}` : currentName;
    }

    // Verificar unicidad de username, num_doc o email si se están actualizando
    const whereClause = {
        id: { [Op.ne]: id } // Excluir al propio usuario
    };

    const uniqueFields = [];
    if (userData.username && userData.username !== user.username) uniqueFields.push({ username: userData.username });
    if (userData.num_doc && userData.num_doc !== user.num_doc) uniqueFields.push({ num_doc: userData.num_doc });
    if (userData.email && userData.email !== user.email) uniqueFields.push({ email: userData.email });

    if (uniqueFields.length > 0) {
        Object.assign(whereClause, { [Op.or]: uniqueFields });
        const existingUser = await User.findOne({ where: whereClause });
        if (existingUser) {
            const field = existingUser.username === userData.username ? 'username' : 
                          existingUser.num_doc === userData.num_doc ? 'número de documento' : 'email';
            throw AppError.badRequest(`El ${field} ya está en uso`, null, 'USER_EXISTS');
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
