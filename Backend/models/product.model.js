// models/product.model.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(20),
      defaultValue: 'unidad'
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    min_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    current_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    max_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1000
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    requires_prescription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expiration_date: {
      type: DataTypes.DATE,
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
    tableName: 'products',
    timestamps: false // porque ya defines created_at y updated_at manualmente
  });

  return Product;
};
