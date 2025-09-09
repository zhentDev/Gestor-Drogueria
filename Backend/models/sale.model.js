
// models/sale.model.js
const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    customer_name: {
      type: DataTypes.STRING(200),
      defaultValue: 'Cliente General'
    },
    customer_nit: {
      type: DataTypes.STRING(50),
      defaultValue: 'C/F'
    },
    sale_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    payment_method: {
      type: DataTypes.ENUM('cash', 'card', 'transfer'),
      defaultValue: 'cash'
    },
    status: {
      type: DataTypes.ENUM('completed', 'cancelled', 'pending'),
      defaultValue: 'completed'
    }
  }, {
    tableName: 'sales'
  });