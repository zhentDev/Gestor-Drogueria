// ==========================================
// ESTRUCTURA DE CARPETAS DEL PROYECTO
// ==========================================
/*
pharmacy-backend/
├── bin/
│   └── www
├── config/
│   ├── database.js
│   └── constants.js
├── controllers/
│   ├── auth.controller.js
│   ├── users.controller.js
│   ├── products.controller.js
│   ├── purchases.controller.js
│   ├── sales.controller.js
│   ├── cash.controller.js
│   ├── reports.controller.js
│   └── dashboard.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── validation.middleware.js
│   ├── error.middleware.js
│   └── role.middleware.js
├── models/
│   ├── index.js
│   ├── user.model.js
│   ├── product.model.js
│   ├── supplier.model.js
│   ├── purchase.model.js
│   ├── sale.model.js
│   ├── cash.model.js
│   └── audit.model.js
├── routes/
│   ├── index.js
│   ├── auth.routes.js
│   ├── users.routes.js
│   ├── products.routes.js
│   ├── purchases.routes.js
│   ├── sales.routes.js
│   ├── cash.routes.js
│   └── reports.routes.js
├── services/
│   ├── auth.service.js
│   ├── inventory.service.js
│   ├── invoice.service.js
│   ├── reports.service.js
│   └── audit.service.js
├── utils/
│   ├── validators.js
│   ├── helpers.js
│   └── pdf.generator.js
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── pharmacy.db 
├── .env
├── .env.example
├── package.json
└── app.js
*/

// ==========================================
// 1. PACKAGE.JSON
// ==========================================
const packageJson = {
  name: "pharmacy-backend",
  version: "1.0.0",
  description: "Sistema de gestión de farmacia",
  main: "app.js",
  scripts: {
    start: "node ./bin/www",
    dev: "nodemon ./bin/www",
    migrate: "node ./database/migrations/run.js",
    seed: "node ./database/seeds/run.js",
  },
  dependencies: {
    express: "^4.18.2",
    sqlite3: "^5.1.6",
    sequelize: "^6.35.0",
    bcryptjs: "^2.4.3",
    jsonwebtoken: "^9.0.2",
    dotenv: "^16.3.1",
    cors: "^2.8.5",
    helmet: "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    pdfkit: "^0.14.0",
    moment: "^2.29.4",
    winston: "^3.11.0",
    compression: "^1.7.4",
  },
  devDependencies: {
    nodemon: "^3.0.2",
  },
};

// ==========================================
// 2. CONFIGURACIÓN DE BASE DE DATOS
// ==========================================
// config/database.js
const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database/pharmacy.db"),
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
});

module.exports = sequelize;

// ==========================================
// 3. MODELOS DE BASE DE DATOS
// ==========================================

// models/user.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "seller", "cashier"),
      defaultValue: "seller",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// models/product.model.js
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING(20),
      defaultValue: "unidad",
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    current_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    min_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    max_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "products",
  }
);

// models/supplier.model.js
const Supplier = sequelize.define(
  "Supplier",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    nit: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    contact_person: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    address: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "suppliers",
  }
);

// models/purchase.model.js
const Purchase = sequelize.define(
  "Purchase",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Supplier,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    purchase_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "credit", "transfer"),
      defaultValue: "cash",
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "purchases",
  }
);

// models/purchase_detail.model.js
const PurchaseDetail = sequelize.define(
  "PurchaseDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Purchase,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "purchase_details",
  }
);

// models/sale.model.js
const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    customer_name: {
      type: DataTypes.STRING(200),
      defaultValue: "Cliente General",
    },
    customer_nit: {
      type: DataTypes.STRING(50),
      defaultValue: "C/F",
    },
    sale_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    total_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "card", "transfer"),
      defaultValue: "cash",
    },
    status: {
      type: DataTypes.ENUM("completed", "cancelled", "pending"),
      defaultValue: "completed",
    },
  },
  {
    tableName: "sales",
  }
);

// models/sale_detail.model.js
const SaleDetail = sequelize.define(
  "SaleDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sale_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Sale,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "sale_details",
  }
);

// models/cash_register.model.js
const CashRegister = sequelize.define(
  "CashRegister",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    opening_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    closing_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    initial_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    sales_total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    expenses_total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    expected_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    actual_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    difference: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "open",
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "cash_registers",
  }
);

// models/cash_movement.model.js
const CashMovement = sequelize.define(
  "CashMovement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cash_register_id: {
      type: DataTypes.INTEGER,
      references: {
        model: CashRegister,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("income", "expense", "withdrawal"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    reference_type: {
      type: DataTypes.STRING(50), // 'sale', 'purchase', 'manual'
      allowNull: true,
    },
    reference_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    movement_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cash_movements",
  }
);

// models/audit_log.model.js
const AuditLog = sequelize.define(
  "AuditLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    old_values: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    new_values: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "audit_logs",
    updatedAt: false,
  }
);

// ==========================================
// 4. ASOCIACIONES
// ==========================================
// models/index.js
const defineAssociations = () => {
  // Usuario - Compras
  User.hasMany(Purchase, { foreignKey: "user_id" });
  Purchase.belongsTo(User, { foreignKey: "user_id" });

  // Proveedor - Compras
  Supplier.hasMany(Purchase, { foreignKey: "supplier_id" });
  Purchase.belongsTo(Supplier, { foreignKey: "supplier_id" });

  // Compras - Detalles
  Purchase.hasMany(PurchaseDetail, { foreignKey: "purchase_id" });
  PurchaseDetail.belongsTo(Purchase, { foreignKey: "purchase_id" });

  // Productos - Detalles de Compra
  Product.hasMany(PurchaseDetail, { foreignKey: "product_id" });
  PurchaseDetail.belongsTo(Product, { foreignKey: "product_id" });

  // Usuario - Ventas
  User.hasMany(Sale, { foreignKey: "user_id" });
  Sale.belongsTo(User, { foreignKey: "user_id" });

  // Ventas - Detalles
  Sale.hasMany(SaleDetail, { foreignKey: "sale_id" });
  SaleDetail.belongsTo(Sale, { foreignKey: "sale_id" });

  // Productos - Detalles de Venta
  Product.hasMany(SaleDetail, { foreignKey: "product_id" });
  SaleDetail.belongsTo(Product, { foreignKey: "product_id" });

  // Usuario - Caja
  User.hasMany(CashRegister, { foreignKey: "user_id" });
  CashRegister.belongsTo(User, { foreignKey: "user_id" });

  // Caja - Movimientos
  CashRegister.hasMany(CashMovement, { foreignKey: "cash_register_id" });
  CashMovement.belongsTo(CashRegister, { foreignKey: "cash_register_id" });

  // Usuario - Movimientos
  User.hasMany(CashMovement, { foreignKey: "user_id" });
  CashMovement.belongsTo(User, { foreignKey: "user_id" });

  // Usuario - Auditoría
  User.hasMany(AuditLog, { foreignKey: "user_id" });
  AuditLog.belongsTo(User, { foreignKey: "user_id" });
};

// ==========================================
// 5. APP.JS PRINCIPAL
// ==========================================
// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests
});
app.use("/api/", limiter);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/purchases", require("./routes/purchases.routes"));
app.use("/api/sales", require("./routes/sales.routes"));
app.use("/api/cash", require("./routes/cash.routes"));
app.use("/api/reports", require("./routes/reports.routes"));

// Error handling middleware
app.use(require("./middlewares/error.middleware"));

module.exports = app;
