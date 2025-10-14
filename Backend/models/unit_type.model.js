// =============================================
// models/unit_type.model.js
// =============================================
module.exports = (sequelize, DataTypes) => {
  const UnitType = sequelize.define('UnitType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    abbreviation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'unit_types',
    timestamps: false,
    underscored: true
  });

  return UnitType;
};
