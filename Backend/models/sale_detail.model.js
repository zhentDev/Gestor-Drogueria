// =============================================
// models/sale_detail.model.js (ACTUALIZADO)
// =============================================
module.exports = (sequelize, DataTypes) => {
  const SaleDetail = sequelize.define('SaleDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_presentation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'sale_details',
    timestamps: false,
    underscored: true
  });

  return SaleDetail;
};