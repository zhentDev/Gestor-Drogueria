// =============================================
// models/purchase_detail.model.js (ACTUALIZADO)
// =============================================
module.exports = (sequelize, DataTypes) => {
  const PurchaseDetail = sequelize.define('PurchaseDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
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
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    batch_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'purchase_details',
    timestamps: false,
    underscored: true
  });

  return PurchaseDetail;
};