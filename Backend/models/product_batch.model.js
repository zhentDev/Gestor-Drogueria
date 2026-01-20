// =============================================
// models/product_batch.model.js
// =============================================
module.exports = (sequelize, DataTypes) => {
  const ProductBatch = sequelize.define('ProductBatch', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    batch_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    initial_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'product_batches',
    timestamps: false,
    underscored: true
  });

  return ProductBatch;
};
