// models/index.js
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // tu instancia de Sequelize

// ------------------------------
// Importa tus archivos de modelo
// Ajusta los nombres si tus archivos difieren
// ------------------------------
const UserDef = require('./user.model');
const CategoryDef = require('./category.model'); 
const ProductDef = require('./product.model');
const AuditLogDef = require('./audit_log.model');
const CashRegisterDef = require('./cash_register.model');
const CashMovementDef = require('./cash_movement.model');
const CustomerDef = require('./customer.model'); 
const InventoryMovementDef = require('./inventory_movement.model'); 
const SettingDef = require('./setting.model'); 
const SupplierDef = require('./supplier.model');
const PurchaseDef = require('./purchase.model');
const PurchaseDetailDef = require('./purchase_detail.model');
const SaleDef = require('./sale.model');
const SaleDetailDef = require('./sale_detail.model');

// ------------------------------
// Inicializa modelos (soporta ambos estilos de export)
// ------------------------------
const modelDefs = {
  User: UserDef,
  Category: CategoryDef,
  Product: ProductDef,
  AuditLog: AuditLogDef,
  CashRegister: CashRegisterDef,
  CashMovement: CashMovementDef,
  Customer: CustomerDef,
  InventoryMovement: InventoryMovementDef,
  Setting: SettingDef,
  Supplier: SupplierDef,
  Purchase: PurchaseDef,
  PurchaseDetail: PurchaseDetailDef,
  Sale: SaleDef,
  SaleDetail: SaleDetailDef
};

const models = {};

// Inicializar cada modelo: como siempre usamos wrapper (función), los ejecutamos
Object.entries(modelDefs).forEach(([name, def]) => {
  if (!def) return; // archivo vacío o no exportado → lo ignoramos
  try {
    models[name] = def(sequelize, DataTypes);
  } catch (err) {
    console.error(`❌ Error inicializando modelo ${name}:`, err.message);
    models[name] = undefined; // lo marcamos para que el dev lo revise
  }
});
// ------------------------------
// Definir asociaciones (descomentadas y organizadas)
// Todas las asociaciones se hacen condicionalmente (si el modelo existe)
// ------------------------------
const M = models; // alias corto para lectura

// Usuarios ↔ Ventas
if (M.User && M.Sale) {
  M.User.hasMany(M.Sale, { foreignKey: 'user_id' });
  M.Sale.belongsTo(M.User, { foreignKey: 'user_id' });
}

// Usuarios ↔ Compras
if (M.User && M.Purchase) {
  M.User.hasMany(M.Purchase, { foreignKey: 'user_id' });
  M.Purchase.belongsTo(M.User, { foreignKey: 'user_id' });
}

// Usuarios ↔ Auditoría
if (M.User && M.AuditLog) {
  M.User.hasMany(M.AuditLog, { foreignKey: 'user_id' });
  M.AuditLog.belongsTo(M.User, { foreignKey: 'user_id' });
}

// Categorías ↔ Productos
if (M.Category && M.Product) {
  M.Category.hasMany(M.Product, { foreignKey: 'category_id' });
  M.Product.belongsTo(M.Category, { foreignKey: 'category_id' });
}

// Productos ↔ Inventario (kardex)
if (M.Product && M.InventoryMovement) {
  M.Product.hasMany(M.InventoryMovement, { foreignKey: 'product_id' });
  M.InventoryMovement.belongsTo(M.Product, { foreignKey: 'product_id' });
}

// Usuarios ↔ Movimientos de Inventario
if (M.User && M.InventoryMovement) {
  M.User.hasMany(M.InventoryMovement, { foreignKey: 'user_id' });
  M.InventoryMovement.belongsTo(M.User, { foreignKey: 'user_id' });
}

// Productos ↔ Detalles de Venta
if (M.Product && M.SaleDetail) {
  M.Product.hasMany(M.SaleDetail, { foreignKey: 'product_id' });
  M.SaleDetail.belongsTo(M.Product, { foreignKey: 'product_id' });
}

// Ventas ↔ Detalles de Venta
if (M.Sale && M.SaleDetail) {
  M.Sale.hasMany(M.SaleDetail, { foreignKey: 'sale_id', onDelete: 'CASCADE' });
  M.SaleDetail.belongsTo(M.Sale, { foreignKey: 'sale_id' });
}

// Compras ↔ Detalles de Compra
if (M.Purchase && M.PurchaseDetail) {
  M.Purchase.hasMany(M.PurchaseDetail, { foreignKey: 'purchase_id', onDelete: 'CASCADE' });
  M.PurchaseDetail.belongsTo(M.Purchase, { foreignKey: 'purchase_id' });
}

// Productos ↔ Detalles de Compra
if (M.Product && M.PurchaseDetail) {
  M.Product.hasMany(M.PurchaseDetail, { foreignKey: 'product_id' });
  M.PurchaseDetail.belongsTo(M.Product, { foreignKey: 'product_id' });
}

// Proveedores ↔ Compras
if (M.Supplier && M.Purchase) {
  M.Supplier.hasMany(M.Purchase, { foreignKey: 'supplier_id' });
  M.Purchase.belongsTo(M.Supplier, { foreignKey: 'supplier_id' });
}

// Caja registradora ↔ Movimientos
if (M.CashRegister && M.CashMovement) {
  M.CashRegister.hasMany(M.CashMovement, { foreignKey: 'cash_register_id' });
  M.CashMovement.belongsTo(M.CashRegister, { foreignKey: 'cash_register_id' });
}

// Usuario ↔ Movimientos de Caja
if (M.User && M.CashMovement) {
  M.User.hasMany(M.CashMovement, { foreignKey: 'user_id' });
  M.CashMovement.belongsTo(M.User, { foreignKey: 'user_id' });
}

// Venta ↔ Movimientos de Caja (si registras movimientos por venta)
if (M.Sale && M.CashMovement) {
  M.Sale.hasMany(M.CashMovement, { foreignKey: 'sale_id' });
  M.CashMovement.belongsTo(M.Sale, { foreignKey: 'sale_id' });
}

// Caja registradora ↔ Ventas
if (M.CashRegister && M.Sale) {
  M.CashRegister.hasMany(M.Sale, { foreignKey: 'cash_register_id' });
  M.Sale.belongsTo(M.CashRegister, { foreignKey: 'cash_register_id' });
}

// Cliente ↔ Ventas
if (M.Customer && M.Sale) {
  M.Customer.hasMany(M.Sale, { foreignKey: 'customer_id' });
  M.Sale.belongsTo(M.Customer, { foreignKey: 'customer_id' });
}

// Supplier ↔ Purchase (repetido en tus comentarios, se garantiza una sola definición)
if (M.Supplier && M.Purchase) {
  M.Supplier.hasMany(M.Purchase, { foreignKey: 'supplier_id' });
  M.Purchase.belongsTo(M.Supplier, { foreignKey: 'supplier_id' });
}

// Product ↔ SaleDetail (repetido, pero seguro)
if (M.Product && M.SaleDetail) {
  M.Product.hasMany(M.SaleDetail, { foreignKey: 'product_id' });
  M.SaleDetail.belongsTo(M.Product, { foreignKey: 'product_id' });
}

// Product ↔ InventoryMovement (asegurar que esté también declarado arriba)
if (M.Product && M.InventoryMovement) {
  M.Product.hasMany(M.InventoryMovement, { foreignKey: 'product_id' });
  M.InventoryMovement.belongsTo(M.Product, { foreignKey: 'product_id' });
}

// PurchaseDetail ↔ Product (asegurar consistencia)
if (M.PurchaseDetail && M.Product) {
  M.Product.hasMany(M.PurchaseDetail, { foreignKey: 'product_id' });
  M.PurchaseDetail.belongsTo(M.Product, { foreignKey: 'product_id' });
}

// PurchaseDetail ↔ Purchase (onDelete cascade ya definido arriba)
if (M.Purchase && M.PurchaseDetail) {
  M.Purchase.hasMany(M.PurchaseDetail, { foreignKey: 'purchase_id', onDelete: 'CASCADE' });
  M.PurchaseDetail.belongsTo(M.Purchase, { foreignKey: 'purchase_id' });
}

// ------------------------------
// Exporta sequelize + modelos
// ------------------------------
module.exports = {
  sequelize,
  Sequelize,
  ...models
};
