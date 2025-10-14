// =============================================
// models/product.model.js
// =============================================
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    barcode: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      field: 'barcode'
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    manufacturer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    invima_registry: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    requires_prescription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    tableName: 'products',
    timestamps: false,
    underscored: true
  });

  return Product;
};