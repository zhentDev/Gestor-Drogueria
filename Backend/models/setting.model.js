// models/supplier.model.js
module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      nit: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      contact_person: {
        type: DataTypes.STRING(100),
        allowNull: true
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
      tableName: 'suppliers',
      timestamps: false
    });
  

    return Supplier;
  };
  