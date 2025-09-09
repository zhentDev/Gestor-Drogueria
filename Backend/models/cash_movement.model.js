
// models/cash_movement.model.js
const CashMovement = sequelize.define('CashMovement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cash_register_id: {
      type: DataTypes.INTEGER,
      references: {
        model: CashRegister,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM('income', 'expense', 'withdrawal'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    reference_type: {
      type: DataTypes.STRING(50), // 'sale', 'purchase', 'manual'
      allowNull: true
    },
    reference_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    movement_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'cash_movements'
  });