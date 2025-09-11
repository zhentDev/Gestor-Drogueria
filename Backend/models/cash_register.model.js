// models/cash_register.js
module.exports = (sequelize, DataTypes) => {
  const CashRegister = sequelize.define('CashRegister', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // nombre de la tabla
        key: 'id'
      }
    },
    opening_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    closing_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    initial_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    sales_total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    expenses_total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    expected_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    actual_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    difference: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('open', 'closed'),
      defaultValue: 'open'
    },
    notes: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'cash_registers',
    createdAt: 'created_at',
    updatedAt: false
  });



  return CashRegister;
};
