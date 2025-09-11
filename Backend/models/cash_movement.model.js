// models/cash_movement.js
module.exports = (sequelize, DataTypes) => {
  const CashMovement = sequelize.define('CashMovement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cash_register_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cash_registers', // nombre de la tabla
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    movement_type: {
      type: DataTypes.STRING(20), // entrada, salida, venta, gasto
      allowNull: false
    },
    concept: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    movement_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'cash_movements',
    createdAt: 'movement_date',
    updatedAt: false
  });



  return CashMovement;
};
