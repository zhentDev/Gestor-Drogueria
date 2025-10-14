// =============================================
// models/price_history.model.js
// =============================================
module.exports = (sequelize, DataTypes) => {
  const PriceHistory = sequelize.define('PriceHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_presentation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    old_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    new_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    change_reason: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    effective_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'price_history',
    timestamps: false,
    underscored: true
  });

  return PriceHistory;
};
