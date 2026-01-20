// models/index.js
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// =============================================
// IMPORTAR TODOS LOS MODELOS
// =============================================

// Modelos existentes
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
const RefreshTokenDef = require('./refresh_token.model');

// Modelos nuevos
const ManufacturerDef = require('./manufacturer.model');
const UnitTypeDef = require('./unit_type.model');
const ProductPresentationDef = require('./product_presentation.model');
const ProductBatchDef = require('./product_batch.model');
const PriceHistoryDef = require('./price_history.model');

// =============================================
// INICIALIZAR MODELOS
// =============================================

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
  SaleDetail: SaleDetailDef,
  RefreshToken: RefreshTokenDef,
  // Nuevos modelos
  Manufacturer: ManufacturerDef,
  UnitType: UnitTypeDef,
  ProductPresentation: ProductPresentationDef,
  ProductBatch: ProductBatchDef,
  PriceHistory: PriceHistoryDef
};

const models = {};

// Inicializar cada modelo
Object.entries(modelDefs).forEach(([name, def]) => {
  if (!def) return;
  try {
    models[name] = def(sequelize, DataTypes);
  } catch (err) {
    console.error(`❌ Error inicializando modelo ${name}:`, err.message);
    models[name] = undefined;
  }
});

// =============================================
// DEFINIR TODAS LAS ASOCIACIONES
// =============================================

const M = models; // Alias corto para lectura

// =============================================
// ASOCIACIONES EXISTENTES
// =============================================

// Usuarios ↔ Ventas
if (M.User && M.Sale) {
  M.User.hasMany(M.Sale, { foreignKey: 'user_id', as: 'sales' });
  M.Sale.belongsTo(M.User, { foreignKey: 'user_id', as: 'user' });
}

// Usuarios ↔ Compras
if (M.User && M.Purchase) {
  M.User.hasMany(M.Purchase, { foreignKey: 'user_id', as: 'purchases' });
  M.Purchase.belongsTo(M.User, { foreignKey: 'user_id', as: 'user' });
}

// Usuarios ↔ Auditoría
if (M.User && M.AuditLog) {
  M.User.hasMany(M.AuditLog, { foreignKey: 'user_id', as: 'auditLogs' });
  M.AuditLog.belongsTo(M.User, { foreignKey: 'user_id', as: 'user' });
}

// Categorías ↔ Productos
if (M.Category && M.Product) {
  M.Category.hasMany(M.Product, { foreignKey: 'category_id', as: 'products' });
  M.Product.belongsTo(M.Category, { foreignKey: 'category_id', as: 'category' });
}

// Productos ↔ Inventario (kardex)
if (M.Product && M.InventoryMovement) {
  M.Product.hasMany(M.InventoryMovement, { foreignKey: 'product_id', as: 'inventoryMovements' });
  M.InventoryMovement.belongsTo(M.Product, { foreignKey: 'product_id', as: 'product' });
}

// Usuarios ↔ Movimientos de Inventario
if (M.User && M.InventoryMovement) {
  M.User.hasMany(M.InventoryMovement, { foreignKey: 'user_id', as: 'inventoryMovements' });
  M.InventoryMovement.belongsTo(M.User, { foreignKey: 'user_id', as: 'user' });
}

// Productos ↔ Detalles de Venta
if (M.Product && M.SaleDetail) {
  M.Product.hasMany(M.SaleDetail, { foreignKey: 'product_id', as: 'saleDetails' });
  M.SaleDetail.belongsTo(M.Product, { foreignKey: 'product_id', as: 'product' });
}

// Ventas ↔ Detalles de Venta
if (M.Sale && M.SaleDetail) {
  M.Sale.hasMany(M.SaleDetail, { foreignKey: 'sale_id', as: 'saleDetails', onDelete: 'CASCADE' });
  M.SaleDetail.belongsTo(M.Sale, { foreignKey: 'sale_id', as: 'sale' });
}

// Compras ↔ Detalles de Compra
if (M.Purchase && M.PurchaseDetail) {
  M.Purchase.hasMany(M.PurchaseDetail, { foreignKey: 'purchase_id', as: 'purchaseDetails', onDelete: 'CASCADE' });
  M.PurchaseDetail.belongsTo(M.Purchase, { foreignKey: 'purchase_id', as: 'purchase' });
}

// Productos ↔ Detalles de Compra
if (M.Product && M.PurchaseDetail) {
  M.Product.hasMany(M.PurchaseDetail, { foreignKey: 'product_id', as: 'purchaseDetails' });
  M.PurchaseDetail.belongsTo(M.Product, { foreignKey: 'product_id', as: 'product' });
}

// Proveedores ↔ Compras
if (M.Supplier && M.Purchase) {
  M.Supplier.hasMany(M.Purchase, { foreignKey: 'supplier_id', as: 'purchases' });
  M.Purchase.belongsTo(M.Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
}

// Caja registradora ↔ Movimientos
if (M.CashRegister && M.CashMovement) {
  M.CashRegister.hasMany(M.CashMovement, { foreignKey: 'cash_register_id', as: 'cashMovements' });
  M.CashMovement.belongsTo(M.CashRegister, { foreignKey: 'cash_register_id', as: 'cashRegister' });
}

// Usuario ↔ Movimientos de Caja
if (M.User && M.CashMovement) {
  M.User.hasMany(M.CashMovement, { foreignKey: 'user_id', as: 'cashMovements' });
  M.CashMovement.belongsTo(M.User, { foreignKey: 'user_id', as: 'cashMovementUser' });
}

// Usuario ↔ RefreshTokens
if (M.User && M.RefreshToken) {
  M.User.hasMany(M.RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens' });
  M.RefreshToken.belongsTo(M.User, { foreignKey: 'user_id', as: 'user' });
}

// Venta ↔ Movimientos de Caja
if (M.Sale && M.CashMovement) {
  M.Sale.hasMany(M.CashMovement, { foreignKey: 'sale_id', as: 'cashMovements' });
  M.CashMovement.belongsTo(M.Sale, { foreignKey: 'sale_id', as: 'sale' });
}

// Caja registradora ↔ Ventas
if (M.CashRegister && M.Sale) {
  M.CashRegister.hasMany(M.Sale, { foreignKey: 'cash_register_id', as: 'sales' });
  M.Sale.belongsTo(M.CashRegister, { foreignKey: 'cash_register_id', as: 'cashRegister' });
}

// Cliente ↔ Ventas
if (M.Customer && M.Sale) {
  M.Customer.hasMany(M.Sale, { foreignKey: 'customer_id', as: 'sales' });
  M.Sale.belongsTo(M.Customer, { foreignKey: 'customer_id', as: 'customer' });
}

// Usuario ↔ Caja Registradora
if (M.User && M.CashRegister) {
  M.User.hasMany(M.CashRegister, { foreignKey: 'user_id', as: 'cashRegisters' });
  M.CashRegister.belongsTo(M.User, { foreignKey: 'user_id', as: 'user' });
}

// =============================================
// NUEVAS ASOCIACIONES - MÓDULO DE PRODUCTOS MEJORADO
// =============================================

// Fabricantes ↔ Productos
if (M.Manufacturer && M.Product) {
  M.Manufacturer.hasMany(M.Product, { foreignKey: 'manufacturer_id', as: 'products' });
  M.Product.belongsTo(M.Manufacturer, { foreignKey: 'manufacturer_id', as: 'manufacturer' });
}

// Productos ↔ Presentaciones
if (M.Product && M.ProductPresentation) {
  M.Product.hasMany(M.ProductPresentation, { foreignKey: 'product_id', as: 'presentations', onDelete: 'CASCADE' });
  M.ProductPresentation.belongsTo(M.Product, { foreignKey: 'product_id', as: 'product' });
}

// Tipos de Unidad ↔ Presentaciones
if (M.UnitType && M.ProductPresentation) {
  M.UnitType.hasMany(M.ProductPresentation, { foreignKey: 'unit_type_id', as: 'presentations' });
  M.ProductPresentation.belongsTo(M.UnitType, { foreignKey: 'unit_type_id', as: 'unitType' });
}

// Productos ↔ Lotes
if (M.Product && M.ProductBatch) {
  M.Product.hasMany(M.ProductBatch, { foreignKey: 'product_id', as: 'batches' });
  M.ProductBatch.belongsTo(M.Product, { foreignKey: 'product_id', as: 'product' });
}

// Compras ↔ Lotes
if (M.Purchase && M.ProductBatch) {
  M.Purchase.hasMany(M.ProductBatch, { foreignKey: 'purchase_id', as: 'batches' });
  M.ProductBatch.belongsTo(M.Purchase, { foreignKey: 'purchase_id', as: 'purchase' });
}

// Lotes ↔ Movimientos de Inventario
if (M.ProductBatch && M.InventoryMovement) {
  M.ProductBatch.hasMany(M.InventoryMovement, { foreignKey: 'batch_id', as: 'movements' });
  M.InventoryMovement.belongsTo(M.ProductBatch, { foreignKey: 'batch_id', as: 'batch' });
}

// Presentaciones ↔ Detalles de Venta
if (M.ProductPresentation && M.SaleDetail) {
  M.ProductPresentation.hasMany(M.SaleDetail, { foreignKey: 'product_presentation_id', as: 'saleDetails' });
  M.SaleDetail.belongsTo(M.ProductPresentation, { foreignKey: 'product_presentation_id', as: 'presentation' });
}

// Lotes ↔ Detalles de Venta
if (M.ProductBatch && M.SaleDetail) {
  M.ProductBatch.hasMany(M.SaleDetail, { foreignKey: 'batch_id', as: 'saleDetails' });
  M.SaleDetail.belongsTo(M.ProductBatch, { foreignKey: 'batch_id', as: 'batch' });
}

// Lotes ↔ Detalles de Compra
if (M.ProductBatch && M.PurchaseDetail) {
  M.ProductBatch.hasMany(M.PurchaseDetail, { foreignKey: 'batch_id', as: 'purchaseDetails' });
  M.PurchaseDetail.belongsTo(M.ProductBatch, { foreignKey: 'batch_id', as: 'batch' });
}

// Presentaciones ↔ Historial de Precios
if (M.ProductPresentation && M.PriceHistory) {
  M.ProductPresentation.hasMany(M.PriceHistory, { foreignKey: 'product_presentation_id', as: 'priceHistory' });
  M.PriceHistory.belongsTo(M.ProductPresentation, { foreignKey: 'product_presentation_id', as: 'presentation' });
}

// Usuarios ↔ Historial de Precios
if (M.User && M.PriceHistory) {
  M.User.hasMany(M.PriceHistory, { foreignKey: 'user_id', as: 'priceChanges' });
  M.PriceHistory.belongsTo(M.User, { foreignKey: 'user_id', as: 'user' });
}

// =============================================
// EXPORTAR SEQUELIZE Y MODELOS
// =============================================

module.exports = {
  sequelize,
  Sequelize,
  ...models
};