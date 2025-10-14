// =============================================
// models/product_presentation.model.js
// =============================================
module.exports = (sequelize, DataTypes) => {
  const ProductPresentation = sequelize.define('ProductPresentation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    units_per_presentation: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    barcode: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'product_presentations',
    timestamps: false,
    underscored: true
  });

  return ProductPresentation;
};
