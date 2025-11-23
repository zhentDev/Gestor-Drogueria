// models/sale.model.js - CORREGIDO
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cash_register_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sale_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payment_method: {
      type: DataTypes.STRING(20),
      defaultValue: 'efectivo'
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    change_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'completada'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {  // ❌ FALTABA ESTE CAMPO
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  }, {
    tableName: 'sales',
    timestamps: false,
    underscored: true  // ✅ Agregar esto para consistencia
  });

  return Sale;
};