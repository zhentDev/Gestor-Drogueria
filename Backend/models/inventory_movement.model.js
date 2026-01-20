// =============================================
// models/inventory_movement.model.js (ACTUALIZADO)
// =============================================
module.exports = (sequelize, DataTypes) => {
  const InventoryMovement = sequelize.define('InventoryMovement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    movement_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    movement_reason: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    reference_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reference_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    quantity_before: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_moved: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_after: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    movement_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'inventory_movements',
    timestamps: false,
    underscored: true
  });

  return InventoryMovement;
};