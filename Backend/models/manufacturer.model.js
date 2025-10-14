// =============================================
// models/manufacturer.model.js
// =============================================
module.exports = (sequelize, DataTypes) => {
  const Manufacturer = sequelize.define('Manufacturer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true
    },
    country: {
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
    tableName: 'manufacturers',
    timestamps: false,
    underscored: true
  });

  return Manufacturer;
};