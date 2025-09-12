
https://chatgpt.com/share/68c38d95-6418-8007-aa36-098b603ce74e

// ===============================
// 1. MIDDLEWARE DE AUTENTICACIÓN
// ===============================

// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acceso requerido' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que el usuario aún existe y está activo
    const user = await User.findOne({
      where: { 
        id: decoded.userId, 
        is_active: true 
      },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'Usuario no válido o inactivo' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado' 
      });
    }
    return res.status(403).json({ 
      error: 'Token inválido' 
    });
  }
};

// Middleware para verificar roles de admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Acceso denegado. Se requieren permisos de administrador' 
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin
};

// ===============================
// 2. SERVICIO DE AUTENTICACIÓN
// ===============================

// services/auth.service.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

class AuthService {
  generateToken(userId, role) {
    return jwt.sign(
      { userId, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  generateRefreshToken(userId) {
    return jwt.sign(
      { userId, type: 'refresh' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
  }

  async login(username, password) {
    try {
      // Buscar usuario por username o email
      const user = await User.findOne({
        where: {
          [require('sequelize').Op.or]: [
            { username },
            { email: username }
          ],
          is_active: true
        }
      });

      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      // Validar contraseña
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      // Generar tokens
      const token = this.generateToken(user.id, user.role);
      const refreshToken = this.generateRefreshToken(user.id);

      // Retornar datos sin contraseña
      const { password: _, ...userWithoutPassword } = user.toJSON();

      return {
        user: userWithoutPassword,
        token,
        refreshToken
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar contraseña actual
      const isValidPassword = await user.validatePassword(currentPassword);
      if (!isValidPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      // Actualizar contraseña (el hook beforeUpdate se encarga del hash)
      await user.update({ password: newPassword });

      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      
      if (decoded.type !== 'refresh') {
        throw new Error('Token inválido');
      }

      const user = await User.findOne({
        where: { id: decoded.userId, is_active: true },
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const newToken = this.generateToken(user.id, user.role);
      
      return { token: newToken };
    } catch (error) {
      throw error;
    }
  }

  async getMe(userId) {
    try {
      const user = await User.findOne({
        where: { id: userId, is_active: true },
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();

// ===============================
// 3. SERVICIO DE USUARIOS
// ===============================

// services/user.service.js
const { User } = require('../models');
const { Op } = require('sequelize');

class UserService {
  async getAllUsers(page = 1, limit = 10, search = '') {
    try {
      const offset = (page - 1) * limit;
      
      const whereClause = search ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { full_name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      } : {};

      const { count, rows } = await User.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['password'] },
        limit: parseInt(limit),
        offset,
        order: [['created_at', 'DESC']]
      });

      return {
        users: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData) {
    try {
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
        throw new Error('El username o email ya están en uso');
      }

      const user = await User.create(userData);
      const { password, ...userWithoutPassword } = user.toJSON();
      
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
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
          throw new Error('El username o email ya están en uso');
        }
      }

      await user.update(userData);
      const { password, ...userWithoutPassword } = user.toJSON();
      
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Soft delete - marcar como inactivo
      await user.update({ is_active: false });
      
      return { message: 'Usuario desactivado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async toggleUserStatus(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      await user.update({ is_active: !user.is_active });
      
      return { 
        message: `Usuario ${user.is_active ? 'activado' : 'desactivado'} correctamente`,
        is_active: user.is_active
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();

// ===============================
// 4. CONTROLADOR DE AUTENTICACIÓN
// ===============================

// controllers/auth.controller.js
const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Datos de entrada inválidos',
          details: errors.array()
        });
      }

      const { username, password } = req.body;
      const result = await authService.login(username, password);

      res.json({
        success: true,
        message: 'Login exitoso',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  }

  async changePassword(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Datos de entrada inválidos',
          details: errors.array()
        });
      }

      const { currentPassword, newPassword } = req.body;
      const result = await authService.changePassword(
        req.user.id,
        currentPassword,
        newPassword
      );

      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: 'Refresh token requerido'
        });
      }

      const result = await authService.refreshToken(refreshToken);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Refresh token inválido'
      });
    }
  }

  async me(req, res) {
    try {
      const user = await authService.getMe(req.user.id);

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  async logout(req, res) {
    // En un sistema más complejo, aquí podrías invalidar el token
    // agregándolo a una blacklist en Redis o base de datos
    res.json({
      success: true,
      message: 'Logout exitoso'
    });
  }
}

module.exports = new AuthController();

// ===============================
// 5. CONTROLADOR DE USUARIOS
// ===============================

// controllers/user.controller.js
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

class UserController {
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await userService.getAllUsers(page, limit, search);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Datos de entrada inválidos',
          details: errors.array()
        });
      }

      const user = await userService.createUser(req.body);

      res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Datos de entrada inválidos',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);

      res.json({
        success: true,
        message: 'Usuario actualizado correctamente',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      
      // Prevenir que un admin se elimine a sí mismo
      if (parseInt(id) === req.user.id) {
        return res.status(400).json({
          success: false,
          error: 'No puedes eliminar tu propia cuenta'
        });
      }

      const result = await userService.deleteUser(id);

      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      
      // Prevenir que un admin se desactive a sí mismo
      if (parseInt(id) === req.user.id) {
        return res.status(400).json({
          success: false,
          error: 'No puedes cambiar el estado de tu propia cuenta'
        });
      }

      const result = await userService.toggleUserStatus(id);

      res.json({
        success: true,
        message: result.message,
        data: { is_active: result.is_active }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new UserController();

// ===============================
// 6. VALIDACIONES
// ===============================

// validators/auth.validator.js
const { body } = require('express-validator');

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username o email es requerido')
    .isLength({ min: 3 })
    .withMessage('Username debe tener al menos 3 caracteres'),
  
  body('password')
    .notEmpty()
    .withMessage('Contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Contraseña actual es requerida'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La nueva contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    })
];

module.exports = {
  loginValidation,
  changePasswordValidation
};

// validators/user.validator.js
const { body } = require('express-validator');

const createUserValidation = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username solo puede contener letras, números y guiones bajos'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número'),
  
  body('full_name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre completo debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email debe ser válido'),
  
  body('role')
    .isIn(['admin', 'vendedor', 'cajero'])
    .withMessage('Rol debe ser: admin, vendedor o cajero')
];

const updateUserValidation = [
  body('username')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username debe tener entre 3 y 50 caracteres'),
  
  body('full_name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre completo debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email debe ser válido'),
  
  body('role')
    .optional()
    .isIn(['admin', 'vendedor', 'cajero'])
    .withMessage('Rol debe ser: admin, vendedor o cajero')
];

module.exports = {
  createUserValidation,
  updateUserValidation
};

// ===============================
// 7. RUTAS
// ===============================

// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { loginValidation, changePasswordValidation } = require('../validators/auth.validator');

// Rutas públicas
router.post('/login', loginValidation, authController.login);
router.post('/refresh', authController.refreshToken);

// Rutas protegidas
router.use(authenticateToken);
router.get('/me', authController.me);
router.post('/change-password', changePasswordValidation, authController.changePassword);
router.post('/logout', authController.logout);

module.exports = router;

// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, requireAdmin } = require('../middleware/auth.middleware');
const { createUserValidation, updateUserValidation } = require('../validators/user.validator');

// Todas las rutas requieren autenticación y permisos de admin
router.use(authenticateToken, requireAdmin);

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', createUserValidation, userController.create);
router.put('/:id', updateUserValidation, userController.update);
router.delete('/:id', userController.delete);
router.patch('/:id/toggle-status', userController.toggleStatus);

module.exports = router;

// ===============================
// 8. ARCHIVO DE VARIABLES DE ENTORNO
// ===============================

// .env (ejemplo)
/*
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui_256_bits_minimo
JWT_REFRESH_SECRET=tu_refresh_secret_diferente_aqui
JWT_EXPIRES_IN=24h
*/

// ===============================
// 9. CONFIGURACIÓN EN APP.JS
// ===============================

/*
// app.js (ejemplo de configuración)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));

// Middleware de manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

module.exports = app;
*/