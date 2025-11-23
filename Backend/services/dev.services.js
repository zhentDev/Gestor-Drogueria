// services/devService.js
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const AppError = require('../utils/appError.utils');

// Importar modelos directamente
const { 
  Sale, 
  SaleDetail, 
  Purchase, 
  PurchaseDetail,
  Product,
  ProductBatch,
  ProductPresentation,
  Customer,
  User,
  CashRegister
} = require('../models');

/**
 * Ejecuta múltiples sentencias SQL separadas por ';'
 * Omite líneas vacías y comentarios que empiezan con '--'
 */
async function execMultiSql(sql, options = {}) {
  const cleaned = sql
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => !line.startsWith('--'))
    .join(' ');

  const statements = cleaned.split(';').map(s => s.trim()).filter(Boolean);

  for (const stmt of statements) {
    const upper = stmt.toUpperCase();
    if (upper === 'BEGIN TRANSACTION' || upper === 'COMMIT') {
      continue;
    }
    if (upper.startsWith('PRAGMA')) {
      await sequelize.query(stmt, options);
      continue;
    }
    await sequelize.query(stmt, { ...options, raw: true, type: QueryTypes.RAW });
  }
}

/* -------------------------
  Scripts SQL para populate y reset
--------------------------*/

const POPULATE_SQL = `
PRAGMA foreign_keys = ON;

--------------------------------------------------------------------------------
-- 1. CATEGORIES
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO categories (id, name, description) VALUES
(1, 'Analgésicos', 'Medicamentos para el dolor y la fiebre'),
(2, 'Antibióticos', 'Medicamentos bajo prescripción para infecciones bacterianas'),
(3, 'Jarabes', 'Jarabes para tos, expectorantes y antitusivos'),
(4, 'Vitaminas y Suplementos', 'Vitaminas, minerales y suplementos dietarios'),
(5, 'Antihistamínicos', 'Medicamentos para alergias y reacciones alérgicas'),
(6, 'Gastrointestinales', 'Medicamentos para problemas digestivos'),
(7, 'Otros', 'Productos generales: antisépticos, vendas, cuidado personal');

--------------------------------------------------------------------------------
-- 2. MANUFACTURERS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO manufacturers (id, name, code, country, is_active) VALUES
(1, 'TECNOQUIMICAS S.A.', 'TQ', 'Colombia', 1),
(2, 'RECKITT BENCKISER', 'RB', 'Reino Unido', 1),
(3, 'BAYER', 'BAY', 'Alemania', 1),
(4, 'PFIZER', 'PFZ', 'Estados Unidos', 1),
(5, 'GENFAR', 'GEN', 'Colombia', 1),
(6, 'MK (MERCK)', 'MK', 'Alemania', 1),
(7, 'SANOFI', 'SAN', 'Francia', 1);

--------------------------------------------------------------------------------
-- 3. SUPPLIERS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO suppliers (id, name, nit, phone, email, address, contact_person, is_active) VALUES
(1, 'Distribuidora Farmacéutica Nacional', '900123456-7', '(+57)3201112222', 'ventas@dfn.com.co', 'Cra 10 #20-30, Bogotá', 'Carlos Ruiz', 1),
(2, 'Droguería la Salud Mayoristas', '900987654-3', '(+57)3109876543', 'contacto@lasalud.com.co', 'Av 68 #45-67, Bogotá', 'Marta Gómez', 1),
(3, 'MediDistribuidores SAS', '900555333-1', '(+57)3115553333', 'ventas@medidist.com.co', 'Cll 5 #12-34, Bogotá', 'Luis Torres', 1);

--------------------------------------------------------------------------------
-- 4. UNIT TYPES
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO unit_types (id, name, abbreviation, description) VALUES
(1, 'UNIDAD', 'UND', 'Venta individual por unidad'),
(2, 'CAJA', 'CJA', 'Caja contenedora de múltiples unidades'),
(3, 'BLISTER', 'BLS', 'Empaque blister'),
(4, 'FRASCO', 'FRS', 'Frasco o botella'),
(5, 'SOBRE', 'SOB', 'Sobre individual'),
(6, 'TUBO', 'TUB', 'Tubo (cremas, ungüentos)');

--------------------------------------------------------------------------------
-- 5. CUSTOMERS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO customers (id, document_type, document_number, full_name, phone, email, address, birth_date) VALUES
(1, 'CC', '1000001', 'Ana Martínez López', '3001001001', 'ana.martinez@email.com', 'Cll 10 #20-30, Bogotá', '1985-04-12'),
(2, 'CC', '1000002', 'Carlos Rodríguez', '3002002002', 'carlos.rodriguez@email.com', 'Cll 12 #22-34, Bogotá', '1990-09-23'),
(3, 'NIT', '900111222-3', 'Empresa Salud S.A.', '6010001000', 'contacto@empresasalud.com', 'Av 1 #1-01, Bogotá', NULL);

--------------------------------------------------------------------------------
-- 6. PRODUCTS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO products (id, barcode, name, description, category_id, manufacturer_id, invima_registry, requires_prescription, location, is_active) VALUES
(1, '7702057160821', 'NORAVER ACETAMINOFEN 500 MG', 'Acetaminofén 500 mg en polvo para solución oral', 1, 1, '2015M-0016065', 0, 'ESTANTE A-1', 1),
(2, '7702026000123', 'DOLEX PARACETAMOL 500 MG', 'Paracetamol 500 mg tabletas', 1, 5, '2010M-0012345', 0, 'ESTANTE A-1', 1),
(3, '7702057123456', 'IBUPROFENO GENFAR 400 MG', 'Ibuprofeno 400 mg tabletas recubiertas', 1, 5, '2012M-0023456', 0, 'ESTANTE A-2', 1),
(4, '7702057234567', 'AMOXICILINA MK 500 MG', 'Amoxicilina 500 mg cápsulas', 2, 6, '2008M-0034567', 1, 'ESTANTE B-1', 1),
(5, '7702057345678', 'AZITROMICINA GENFAR 500 MG', 'Azitromicina 500 mg tabletas', 2, 5, '2011M-0045678', 1, 'ESTANTE B-2', 1),
(6, '7702626211770', 'GAVISCON ALGINATO SODIO 500/100 MG/ML', 'Alginato de sodio suspensión oral', 6, 2, '2019M-0013657-R1', 0, 'ESTANTE C-1', 1),
(7, '7702057456789', 'VITAMINA C 500 MG', 'Ácido ascórbico 500 mg tabletas', 4, 5, '2013M-0056789', 0, 'ESTANTE D-1', 1),
(8, '7702057567890', 'COMPLEJO B FUERTE', 'Complejo vitamínico B cápsulas', 4, 5, '2014M-0067890', 0, 'ESTANTE D-2', 1),
(9, '7702057678901', 'AMBROXOL JARABE 15 MG/5ML', 'Ambroxol clorhidrato jarabe 120 ml', 3, 1, '2009M-0078901', 0, 'ESTANTE C-2', 1),
(10, '7702057789012', 'LORATADINA JARABE 5 MG/5ML', 'Loratadina jarabe 60 ml', 5, 1, '2010M-0089012', 0, 'ESTANTE C-3', 1),
(11, '7702057890123', 'ALCOHOL ANTISEPTICO 70%', 'Alcohol etílico 70% - 120 ml', 7, NULL, NULL, 0, 'ESTANTE E-1', 1),
(12, '7702057901234', 'GEL ANTIBACTERIAL', 'Gel antibacterial con aloe vera 250 ml', 7, NULL, NULL, 0, 'ESTANTE E-2', 1);

--------------------------------------------------------------------------------
-- 7. PRODUCT PRESENTATIONS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO product_presentations (id, product_id, unit_type_id, units_per_presentation, barcode, sale_price, is_default, is_active) VALUES
(1, 1, 2, 10, '7702057160821-CJA', 27000, 0, 1),
(2, 1, 1, 1, '7702057160821', 3000, 1, 1),
(3, 2, 2, 20, '7702026000123-CJA', 12000, 0, 1),
(4, 2, 1, 1, '7702026000123', 700, 1, 1),
(5, 3, 2, 20, '7702057123456-CJA', 15000, 0, 1),
(6, 3, 1, 1, '7702057123456', 900, 1, 1),
(7, 4, 4, 20, '7702057234567-FRS', 18000, 0, 1),
(8, 4, 1, 1, '7702057234567', 1000, 1, 1),
(9, 5, 3, 3, '7702057345678-BLS', 15000, 1, 1),
(10, 6, 1, 1, '7702626211770', 3500, 1, 1),
(11, 7, 2, 20, '7702057456789-CJA', 9000, 0, 1),
(12, 7, 1, 1, '7702057456789', 500, 1, 1),
(13, 8, 4, 30, '7702057567890-FRS', 12000, 1, 1),
(14, 9, 4, 1, '7702057678901', 8500, 1, 1),
(15, 10, 4, 1, '7702057789012', 7500, 1, 1),
(16, 11, 4, 1, '7702057890123', 3500, 1, 1),
(17, 12, 4, 1, '7702057901234', 8000, 1, 1);

--------------------------------------------------------------------------------
-- 8. PRODUCT BATCHES (Inventario inicial)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO product_batches (id, product_id, batch_number, expiry_date, quantity, initial_quantity, unit_cost, location, is_active) VALUES
(1, 1, 'LOTE-2024-001', '2026-12-31', 100, 100, 1800, 'ESTANTE A-1', 1),
(2, 2, 'LOTE-2024-002', '2026-06-30', 200, 200, 400, 'ESTANTE A-1', 1),
(3, 3, 'LOTE-2024-003', '2026-08-31', 150, 150, 500, 'ESTANTE A-2', 1),
(4, 4, 'LOTE-2024-004', '2025-12-31', 80, 80, 800, 'ESTANTE B-1', 1),
(5, 6, 'LOTE-2024-005', '2099-12-31', 96, 96, 2100, 'ESTANTE C-1', 1),
(6, 7, 'LOTE-2024-006', '2027-03-31', 200, 200, 300, 'ESTANTE D-1', 1),
(7, 11, 'LOTE-2024-007', '2026-01-31', 100, 100, 1200, 'ESTANTE E-1', 1),
(8, 12, 'LOTE-2024-008', '2026-05-31', 80, 80, 3500, 'ESTANTE E-2', 1);

--------------------------------------------------------------------------------
-- 9. SETTINGS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO settings (setting_key, setting_value, setting_type, description) VALUES
('pharmacy_name', 'Farmacia El Buen Precio', 'string', 'Nombre de la farmacia'),
('pharmacy_nit', '900.123.456-7', 'string', 'NIT de la farmacia'),
('pharmacy_address', 'Calle 123 #45-67, Bogotá D.C.', 'string', 'Dirección de la farmacia'),
('pharmacy_phone', '(601) 234-5678', 'string', 'Teléfono de contacto'),
('tax_rate', '0', 'number', 'Tasa de IVA aplicable (%)'),
('low_stock_threshold', '10', 'number', 'Umbral de stock bajo');
`;

const RESET_SQL = `
PRAGMA foreign_keys = OFF;

DELETE FROM cash_movements;
DELETE FROM inventory_movements;
DELETE FROM sale_details;
DELETE FROM sales;
DELETE FROM purchase_details;
DELETE FROM purchases;
DELETE FROM product_batches;
DELETE FROM product_presentations;
DELETE FROM cash_registers;
DELETE FROM audit_logs;
DELETE FROM refresh_tokens;
DELETE FROM customers;
DELETE FROM products;
DELETE FROM unit_types;
DELETE FROM manufacturers;
DELETE FROM suppliers;
DELETE FROM categories;
DELETE FROM users;
DELETE FROM settings;
DELETE FROM sqlite_sequence;

PRAGMA foreign_keys = ON;
`;

/* -------------------------
  Exported service functions
--------------------------*/
module.exports = {
  /**
   * Pobla la base de datos con datos de prueba
   */
  async populateDb() {
    if (process.env.NODE_ENV !== 'development') {
      throw AppError.forbidden('populateDb only allowed in development');
    }
    
    const t = await sequelize.transaction();
    try {
      // 1. Ejecutar el SQL base
      await execMultiSql(POPULATE_SQL, { transaction: t });
      
      // 2. Crear usuario administrador principal usando el modelo
      // Esto asegura que la contraseña se encripte con bcrypt
      const adminUser = await User.findOne({ 
        where: { username: 'maicoldf' },
        transaction: t 
      });

      if (!adminUser) {
        await User.create({
          username: 'maicoldf',
          password: 'mdfd1234', // Se encriptará automáticamente por el hook
          full_name: 'Maicol Fontecha Dev',
          email: 'maicoldf@farmacia.com',
          role: 'admin',
          is_active: true
        }, { transaction: t });
      }

      // 3. Crear usuarios adicionales de prueba
      const demoUsers = [
        {
          username: 'vendedor1',
          password: 'vendedor123',
          full_name: 'María García',
          email: 'maria.garcia@farmacia.com',
          role: 'vendedor'
        },
        {
          username: 'cajero1',
          password: 'cajero123',
          full_name: 'Juan Pérez',
          email: 'juan.perez@farmacia.com',
          role: 'cajero'
        }
      ];

      for (const userData of demoUsers) {
        const existingUser = await User.findOne({ 
          where: { username: userData.username },
          transaction: t 
        });
        
        if (!existingUser) {
          await User.create(userData, { transaction: t });
        }
      }

      // 4. Crear caja registradora para el cajero
      const cajero = await User.findOne({ 
        where: { username: 'cajero1' },
        transaction: t 
      });

      if (cajero) {
        const existingCashRegister = await CashRegister.findOne({
          where: { 
            user_id: cajero.id,
            status: 'open'
          },
          transaction: t
        });

        if (!existingCashRegister) {
          await CashRegister.create({
            user_id: cajero.id,
            opening_date: new Date(),
            initial_amount: 100000,
            sales_total: 0,
            expenses_total: 0,
            expected_amount: 100000,
            status: 'open',
            notes: 'Caja de prueba abierta automáticamente'
          }, { transaction: t });
        }
      }

      await t.commit();
      
      return { 
        success: true, 
        message: 'Base de datos poblada exitosamente',
        data: {
          categories: 7,
          manufacturers: 7,
          suppliers: 3,
          products: 12,
          presentations: 17,
          batches: 8,
          users: 3,
          customers: 3,
          adminUser: {
            username: 'maicoldf',
            password: 'mdfd1234',
            note: 'Contraseña encriptada con bcrypt'
          }
        }
      };
    } catch (err) {
      await t.rollback();
      throw AppError.internal('Error poblando base de datos', { original: err.message });
    }
  },

  /**
   * Reinicia la base de datos (borra todos los datos)
   */
  async resetDb() {
    if (process.env.NODE_ENV !== 'development') {
      throw AppError.forbidden('resetDb only allowed in development');
    }
    
    const t = await sequelize.transaction();
    try {
      await execMultiSql(RESET_SQL, { transaction: t });
      await t.commit();
      
      return { 
        success: true, 
        message: 'Base de datos reiniciada exitosamente' 
      };
    } catch (err) {
      await t.rollback();
      throw AppError.internal('Error reiniciando base de datos', { original: err.message });
    }
  },

  /**
   * Crea una venta de prueba
   */
  async createTestSale() {
    if (process.env.NODE_ENV !== 'development') {
      throw new AppError.forbidden('createTestSale only allowed in development');
    }
    
    const t = await sequelize.transaction();
    try {
      // Verificar que existan los datos necesarios
      const customer = await Customer.findByPk(1);
      const user = await User.findOne({ where: { username: 'cajero1' } });
      const cashRegister = await CashRegister.findOne({ where: { status: 'open' } });
      const presentation = await ProductPresentation.findByPk(3); // DOLEX CAJA
      const batch = await ProductBatch.findByPk(2); // LOTE-2024-002

      if (!customer || !user || !cashRegister || !presentation || !batch) {
        throw new AppError.badRequest('Datos necesarios no encontrados. Ejecuta populateDb primero.');
      }

      // Verificar stock disponible
      if (batch.quantity < 1) {
        throw new AppError.badRequest('Stock insuficiente en el lote');
      }

      // Generar número de factura único
      const lastSale = await Sale.findOne({ 
        order: [['id', 'DESC']] 
      });
      const nextNumber = lastSale ? lastSale.id + 1 : 1;
      const invoiceNumber = `FAC-TEST-${String(nextNumber).padStart(6, '0')}`;

      // Crear la venta
      const subtotal = 12000;
      const discount = 500;
      const total = subtotal - discount;

      const sale = await Sale.create({
        invoice_number: invoiceNumber,
        customer_id: customer.id,
        user_id: user.id,
        cash_register_id: cashRegister.id,
        sale_date: new Date(),
        subtotal: subtotal,
        tax: 0,
        discount: discount,
        total: total,
        payment_method: 'efectivo',
        amount_paid: 15000,
        change_amount: 15000 - total,
        status: 'completada',
        notes: 'Venta de prueba desde API'
      }, { transaction: t });

      // Crear detalle de venta
      const saleDetail = await SaleDetail.create({
        sale_id: sale.id,
        product_id: presentation.product_id,
        product_presentation_id: presentation.id,
        batch_id: batch.id,
        quantity: 1, // 1 caja
        unit_price: 12000,
        discount: discount,
        subtotal: total
      }, { transaction: t });

      // Actualizar stock del lote (descontar unidades)
      const unitsToDeduct = presentation.units_per_presentation * 1; // 1 caja * 20 unidades
      await batch.decrement('quantity', { 
        by: unitsToDeduct, 
        transaction: t 
      });

      await t.commit();

      // Recargar con relaciones
      await sale.reload({
        include: [
          { model: Customer, as: 'customer' },
          { model: User, as: 'user' },
          { 
            model: SaleDetail, 
            as: 'saleDetails',
            include: [
              { model: Product, as: 'product' },
              { model: ProductPresentation, as: 'presentation' },
              { model: ProductBatch, as: 'batch' }
            ]
          }
        ]
      });

      return { 
        success: true,
        message: 'Venta de prueba creada exitosamente',
        data: sale
      };
    } catch (err) {
      await t.rollback();
      throw AppError.internal('Error creando venta de prueba', { original: err.message });
    }
  },

  /**
   * Crea una compra de prueba
   */
  async createTestPurchase() {
    if (process.env.NODE_ENV !== 'development') {
      throw new AppError.forbidden('createTestPurchase only allowed in development');
    }
    
    const t = await sequelize.transaction();
    try {
      // Buscar usuario admin
      const admin = await User.findOne({ where: { role: 'admin' } });
      
      if (!admin) {
        throw new AppError.badRequest('Usuario administrador no encontrado. Ejecuta populateDb primero.');
      }

      // Generar número de factura único
      const lastPurchase = await Purchase.findOne({ 
        order: [['id', 'DESC']] 
      });
      const nextNumber = lastPurchase ? lastPurchase.id + 1 : 1;
      const invoiceNumber = `PROV-TEST-${String(nextNumber).padStart(6, '0')}`;

      // Crear la compra
      const subtotal = 90000; // 50 unidades * 1800
      const total = subtotal;

      const purchase = await Purchase.create({
        invoice_number: invoiceNumber,
        supplier_id: 1,
        user_id: admin.id,
        purchase_date: new Date(),
        subtotal: subtotal,
        tax: 0,
        discount: 0,
        total: total,
        payment_method: 'transferencia',
        status: 'completada',
        notes: 'Compra de prueba desde API'
      }, { transaction: t });

      // Crear detalle de compra
      const productId = 1; // NORAVER
      const quantity = 50; // 50 unidades
      const unitCost = 1800;
      const batchNumber = `LOTE-TEST-${Date.now()}`;
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 2); // +2 años

      const purchaseDetail = await PurchaseDetail.create({
        purchase_id: purchase.id,
        product_id: productId,
        quantity: quantity,
        unit_price: unitCost,
        subtotal: quantity * unitCost,
        expiry_date: expiryDate,
        batch_number: batchNumber
      }, { transaction: t });

      // Crear el lote de producto
      const batch = await ProductBatch.create({
        product_id: productId,
        batch_number: batchNumber,
        expiry_date: expiryDate,
        quantity: quantity,
        initial_quantity: quantity,
        unit_cost: unitCost,
        purchase_id: purchase.id,
        location: 'ESTANTE A-1',
        is_active: true
      }, { transaction: t });

      // Actualizar batch_id en purchase_detail
      await purchaseDetail.update({ 
        batch_id: batch.id 
      }, { transaction: t });

      await t.commit();

      // Recargar con relaciones
      await purchase.reload({
        include: [
          { 
            model: PurchaseDetail, 
            as: 'purchaseDetails',
            include: [
              { model: Product, as: 'product' },
              { model: ProductBatch, as: 'batch' }
            ]
          }
        ]
      });

      return { 
        success: true,
        message: 'Compra de prueba creada exitosamente',
        data: {
          purchase,
          batch
        }
      };
    } catch (err) {
      await t.rollback();
      throw AppError.internal('Error creando compra de prueba', { original: err.message });
    }
  },

  /**
   * Obtiene estadísticas de la base de datos
   */
  async getStats() {
    try {
      const [products, batches, sales, purchases, customers, users] = await Promise.all([
        Product.count(),
        ProductBatch.count(),
        Sale.count(),
        Purchase.count(),
        Customer.count(),
        User.count()
      ]);

      const totalStock = await ProductBatch.sum('quantity') || 0;

      return {
        success: true,
        data: {
          products,
          batches,
          totalStock,
          sales,
          purchases,
          customers,
          users
        }
      };
    } catch (err) {
      throw AppError.internal('Error obteniendo estadísticas', { original: err.message });
    }
  }
};