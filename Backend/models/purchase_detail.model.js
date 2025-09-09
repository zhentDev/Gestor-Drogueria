
// models/purchase_detail.model.js
const PurchaseDetail = sequelize.define('PurchaseDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Purchase,
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id'
      }
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
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'purchase_details'
  });
  