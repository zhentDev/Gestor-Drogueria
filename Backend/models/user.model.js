// models/user.model.js
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    // Nuevos campos para tipo y número de documento
    tipo_doc: {
      type: DataTypes.ENUM('CC', 'NIT', 'CE', 'PAS'), // Añadir tipos de documento comunes
      allowNull: false,
      defaultValue: 'CC'
    },
    num_doc: {
      type: DataTypes.STRING(20), // Asumiendo un número de documento puede ser de hasta 20 caracteres
      allowNull: false,
      unique: true // El número de documento debe ser único
    },
    // username ahora puede ser generado si no se provee
    username: {
      type: DataTypes.STRING(50),
      allowNull: true, // Se hará opcional
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    // Campos separados para nombre y apellido
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true // Apellido puede ser opcional
    },
    full_name: { // full_name ahora será derivado
      type: DataTypes.STRING(200),
      allowNull: true // Permitir nulo, se establecerá en el hook
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true, // Ahora opcional
      unique: true,
      validate: { isEmail: true }
    },
    // Nuevos campos para dirección y teléfono
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'vendedor', 'cajero'),
      allowNull: false,
      defaultValue: 'vendedor'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeValidate: (user) => {
        // Generar username si no está presente
        if (!user.username && user.num_doc) {
          user.username = user.num_doc;
        }
        // Derivar full_name
        if (user.name) {
          user.full_name = user.last_name ? `${user.name} ${user.last_name}` : user.name;
        }
      },
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
        // Regenerar full_name si name o last_name cambian
        if (user.changed('name') || user.changed('last_name')) {
          user.full_name = user.last_name ? `${user.name} ${user.last_name}` : user.name;
        }
      }
    }
  });

  // método de instancia
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
