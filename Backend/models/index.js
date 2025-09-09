
const defineAssociations = () => {
    // Usuario - Compras
    User.hasMany(Purchase, { foreignKey: 'user_id' });
    Purchase.belongsTo(User, { foreignKey: 'user_id' });
  
    // Proveedor - Compras
    Supplier.hasMany(Purchase, { foreignKey: 'supplier_id' });
    Purchase.belongsTo(Supplier, { foreignKey: 'supplier_id' });
  
    // Compras - Detalles
    Purchase.hasMany(PurchaseDetail, { foreignKey: 'purchase_id' });
    PurchaseDetail.belongsTo(Purchase, { foreignKey: 'purchase_id' });
  
    // Productos - Detalles de Compra
    Product.hasMany(PurchaseDetail, { foreignKey: 'product_id' });
    PurchaseDetail.belongsTo(Product, { foreignKey: 'product_id' });
  
    // Usuario - Ventas
    User.hasMany(Sale, { foreignKey: 'user_id' });
    Sale.belongsTo(User, { foreignKey: 'user_id' });
  
    // Ventas - Detalles
    Sale.hasMany(SaleDetail, { foreignKey: 'sale_id' });
    SaleDetail.belongsTo(Sale, { foreignKey: 'sale_id' });
  
    // Productos - Detalles de Venta
    Product.hasMany(SaleDetail, { foreignKey: 'product_id' });
    SaleDetail.belongsTo(Product, { foreignKey: 'product_id' });
  
    // Usuario - Caja
    User.hasMany(CashRegister, { foreignKey: 'user_id' });
    CashRegister.belongsTo(User, { foreignKey: 'user_id' });
  
    // Caja - Movimientos
    CashRegister.hasMany(CashMovement, { foreignKey: 'cash_register_id' });
    CashMovement.belongsTo(CashRegister, { foreignKey: 'cash_register_id' });
  
    // Usuario - Movimientos
    User.hasMany(CashMovement, { foreignKey: 'user_id' });
    CashMovement.belongsTo(User, { foreignKey: 'user_id' });
  
    // Usuario - Auditoría
    User.hasMany(AuditLog, { foreignKey: 'user_id' });
    AuditLog.belongsTo(User, { foreignKey: 'user_id' });
  };