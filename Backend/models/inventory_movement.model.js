// models/inventoryMovement.js
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
      movement_type: {
        type: DataTypes.ENUM('entrada', 'salida', 'ajuste'),
        allowNull: false
      },
      movement_reason: {
        type: DataTypes.ENUM('compra', 'venta', 'ajuste', 'devolucion', 'vencimiento'),
        allowNull: false
      },
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      reference_type: {
        type: DataTypes.ENUM('purchase', 'sale'),
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
      timestamps: false
    });
  

    return InventoryMovement;
  };
  