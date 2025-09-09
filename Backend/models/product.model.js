// models/product.model.js
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
    category: {
      type: DataTypes.STRING(100),
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
    current_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    min_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    max_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1000
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'products'
  });