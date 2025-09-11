// models/purchase_detail.model.js
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
    expiry_date: {  // 👈 mantener igual que en la tabla
      type: DataTypes.DATE,
      allowNull: true
    },
    batch_number: { // 👈 faltaba en el modelo
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'purchase_details',
    timestamps: false
  });



  return PurchaseDetail;
};
