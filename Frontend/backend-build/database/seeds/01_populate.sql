-- 00_seed_complete_system.sql
-- Script completo para popular la base de datos con datos de prueba
-- Compatible con la nueva estructura de productos con lotes y presentaciones

PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;

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
-- 2. MANUFACTURERS (Fabricantes/Laboratorios)
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
-- 3. SUPPLIERS (Proveedores)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO suppliers (id, name, nit, phone, email, address, contact_person, is_active) VALUES
(1, 'Distribuidora Farmacéutica Nacional', '900123456-7', '(+57)3201112222', 'ventas@dfn.com.co', 'Cra 10 #20-30, Bogotá', 'Carlos Ruiz', 1),
(2, 'Droguería la Salud Mayoristas', '900987654-3', '(+57)3109876543', 'contacto@lasalud.com.co', 'Av 68 #45-67, Bogotá', 'Marta Gómez', 1),
(3, 'MediDistribuidores SAS', '900555333-1', '(+57)3115553333', 'ventas@medidist.com.co', 'Cll 5 #12-34, Bogotá', 'Luis Torres', 1);

--------------------------------------------------------------------------------
-- 4. UNIT TYPES (Tipos de unidades/presentaciones)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO unit_types (id, name, abbreviation, description) VALUES
(1, 'UNIDAD', 'UND', 'Venta individual por unidad'),
(2, 'CAJA', 'CJA', 'Caja contenedora de múltiples unidades'),
(3, 'BLISTER', 'BLS', 'Empaque blister'),
(4, 'FRASCO', 'FRS', 'Frasco o botella'),
(5, 'SOBRE', 'SOB', 'Sobre individual'),
(6, 'TUBO', 'TUB', 'Tubo (cremas, ungüentos)');

--------------------------------------------------------------------------------
-- 5. USERS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO users (id, username, password, full_name, email, role, is_active) VALUES
(1, 'admin', '$2b$10$YourHashedPasswordHere', 'Administrador Principal', 'admin@farmacia.com', 'admin', 1),
(2, 'vendedor1', '$2b$10$YourHashedPasswordHere', 'María García', 'maria.garcia@farmacia.com', 'vendedor', 1),
(3, 'cajero1', '$2b$10$YourHashedPasswordHere', 'Juan Pérez', 'juan.perez@farmacia.com', 'cajero', 1);

--------------------------------------------------------------------------------
-- 6. CUSTOMERS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO customers (id, document_type, document_number, full_name, phone, email, address, birth_date) VALUES
(1, 'CC', '1000001', 'Ana Martínez López', '3001001001', 'ana.martinez@email.com', 'Cll 10 #20-30, Bogotá', '1985-04-12'),
(2, 'CC', '1000002', 'Carlos Rodríguez', '3002002002', 'carlos.rodriguez@email.com', 'Cll 12 #22-34, Bogotá', '1990-09-23'),
(3, 'NIT', '900111222-3', 'Empresa Salud S.A.', '6010001000', 'contacto@empresasalud.com', 'Av 1 #1-01, Bogotá', NULL);

--------------------------------------------------------------------------------
-- 7. PRODUCTS (Productos base - sin stock directo)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO products (id, barcode, name, description, category_id, manufacturer_id, invima_registry, requires_prescription, location, is_active) VALUES
-- Analgésicos
(1, '7702057160821', 'NORAVER ACETAMINOFEN 500 MG', 'Acetaminofén 500 mg en polvo para solución oral', 1, 1, '2015M-0016065', 0, 'ESTANTE A-1', 1),
(2, '7702026000123', 'DOLEX PARACETAMOL 500 MG', 'Paracetamol 500 mg tabletas', 1, 5, '2010M-0012345', 0, 'ESTANTE A-1', 1),
(3, '7702057123456', 'IBUPROFENO GENFAR 400 MG', 'Ibuprofeno 400 mg tabletas recubiertas', 1, 5, '2012M-0023456', 0, 'ESTANTE A-2', 1),

-- Antibióticos
(4, '7702057234567', 'AMOXICILINA MK 500 MG', 'Amoxicilina 500 mg cápsulas', 2, 6, '2008M-0034567', 1, 'ESTANTE B-1', 1),
(5, '7702057345678', 'AZITROMICINA GENFAR 500 MG', 'Azitromicina 500 mg tabletas', 2, 5, '2011M-0045678', 1, 'ESTANTE B-2', 1),

-- Gastrointestinales
(6, '7702626211770', 'GAVISCON ALGINATO SODIO 500/100 MG/ML', 'Alginato de sodio suspensión oral', 6, 2, '2019M-0013657-R1', 0, 'ESTANTE C-1', 1),

-- Vitaminas
(7, '7702057456789', 'VITAMINA C 500 MG', 'Ácido ascórbico 500 mg tabletas', 4, 5, '2013M-0056789', 0, 'ESTANTE D-1', 1),
(8, '7702057567890', 'COMPLEJO B FUERTE', 'Complejo vitamínico B cápsulas', 4, 5, '2014M-0067890', 0, 'ESTANTE D-2', 1),

-- Jarabes
(9, '7702057678901', 'AMBROXOL JARABE 15 MG/5ML', 'Ambroxol clorhidrato jarabe 120 ml', 3, 1, '2009M-0078901', 0, 'ESTANTE C-2', 1),
(10, '7702057789012', 'LORATADINA JARABE 5 MG/5ML', 'Loratadina jarabe 60 ml', 5, 1, '2010M-0089012', 0, 'ESTANTE C-3', 1),

-- Otros
(11, '7702057890123', 'ALCOHOL ANTISEPTICO 70%', 'Alcohol etílico 70% - 120 ml', 7, NULL, NULL, 0, 'ESTANTE E-1', 1),
(12, '7702057901234', 'GEL ANTIBACTERIAL', 'Gel antibacterial con aloe vera 250 ml', 7, NULL, NULL, 0, 'ESTANTE E-2', 1);

--------------------------------------------------------------------------------
-- 8. PRODUCT PRESENTATIONS (Presentaciones de productos con precios)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO product_presentations (id, product_id, unit_type_id, units_per_presentation, barcode, sale_price, is_default, is_active) VALUES
-- NORAVER - Producto 1
(1, 1, 2, 10, '7702057160821-CJA', 27000, 0, 1),  -- CAJA x10 sobres
(2, 1, 1, 1, '7702057160821', 3000, 1, 1),        -- UNIDAD (sobre individual)

-- DOLEX - Producto 2
(3, 2, 2, 20, '7702026000123-CJA', 12000, 0, 1),  -- CAJA x20 tabletas
(4, 2, 1, 1, '7702026000123', 700, 1, 1),         -- UNIDAD

-- IBUPROFENO - Producto 3
(5, 3, 2, 20, '7702057123456-CJA', 15000, 0, 1),  -- CAJA x20
(6, 3, 1, 1, '7702057123456', 900, 1, 1),         -- UNIDAD

-- AMOXICILINA - Producto 4
(7, 4, 4, 20, '7702057234567-FRS', 18000, 0, 1),  -- FRASCO x20 cápsulas
(8, 4, 1, 1, '7702057234567', 1000, 1, 1),        -- UNIDAD

-- AZITROMICINA - Producto 5
(9, 5, 3, 3, '7702057345678-BLS', 15000, 1, 1),   -- BLISTER x3 (presentación única)

-- GAVISCON - Producto 6
(10, 6, 1, 1, '7702626211770', 3500, 1, 1),       -- UNIDAD (frasco)

-- VITAMINA C - Producto 7
(11, 7, 2, 20, '7702057456789-CJA', 9000, 0, 1),  -- CAJA x20
(12, 7, 1, 1, '7702057456789', 500, 1, 1),        -- UNIDAD

-- COMPLEJO B - Producto 8
(13, 8, 4, 30, '7702057567890-FRS', 12000, 1, 1), -- FRASCO x30

-- AMBROXOL JARABE - Producto 9
(14, 9, 4, 1, '7702057678901', 8500, 1, 1),       -- FRASCO 120ml

-- LORATADINA JARABE - Producto 10
(15, 10, 4, 1, '7702057789012', 7500, 1, 1),      -- FRASCO 60ml

-- ALCOHOL - Producto 11
(16, 11, 4, 1, '7702057890123', 3500, 1, 1),      -- FRASCO 120ml

-- GEL ANTIBACTERIAL - Producto 12
(17, 12, 4, 1, '7702057901234', 8000, 1, 1);      -- FRASCO 250ml

--------------------------------------------------------------------------------
-- 9. CASH REGISTER (Caja abierta para pruebas)
--------------------------------------------------------------------------------
INSERT INTO cash_registers (id, user_id, opening_date, initial_amount, sales_total, expenses_total, expected_amount, status, notes)
SELECT 1, 3, datetime('now', '-2 hours'), 100000, 0, 0, 100000, 'open', 'Caja de prueba abierta por cajero1'
WHERE NOT EXISTS (
    SELECT 1 FROM cash_registers 
    WHERE user_id = 3 
    AND status = 'open'
    AND DATE(opening_date) = DATE('now')
);

--------------------------------------------------------------------------------
-- 10. PURCHASES (Compras de ejemplo para crear lotes)
--------------------------------------------------------------------------------
/* INSERT OR IGNORE INTO purchases (id, invoice_number, supplier_id, user_id, purchase_date, subtotal, tax, discount, total, payment_method, status, notes) VALUES
(1, 'PROV-2024-001', 1, 1, datetime('now', '-30 days'), 850000, 0, 10000, 840000, 'transferencia', 'completada', 'Compra inicial de inventario'),
(2, 'PROV-2024-002', 2, 1, datetime('now', '-15 days'), 450000, 0, 5000, 445000, 'efectivo', 'completada', 'Reabastecimiento semanal');
 */
--------------------------------------------------------------------------------
-- 11. PURCHASE DETAILS (Detalles de compras - crearán lotes automáticamente)
--------------------------------------------------------------------------------
-- Compra 1
/* INSERT OR IGNORE INTO purchase_details (id, purchase_id, product_id, quantity, unit_price, subtotal, expiry_date, batch_number) VALUES
(1, 1, 1, 100, 1800, 180000, '2026-12-31', 'LOTE-2024-001'),     -- NORAVER 100 unidades
(2, 1, 2, 200, 400, 80000, '2026-06-30', 'LOTE-2024-002'),       -- DOLEX 200 unidades
(3, 1, 3, 150, 500, 75000, '2026-08-31', 'LOTE-2024-003'),       -- IBUPROFENO 150 unidades
(4, 1, 4, 80, 800, 64000, '2025-12-31', 'LOTE-2024-004'),        -- AMOXICILINA 80 unidades
(5, 1, 6, 96, 2100, 201600, '2099-12-31', 'LOTE-2024-005'),      -- GAVISCON 96 unidades
(6, 1, 7, 200, 300, 60000, '2027-03-31', 'LOTE-2024-006'),       -- VITAMINA C 200 unidades
(7, 1, 11, 100, 1200, 120000, '2026-01-31', 'LOTE-2024-007'),    -- ALCOHOL 100 unidades
(8, 1, 12, 80, 3500, 280000, '2026-05-31', 'LOTE-2024-008');     -- GEL 80 unidades

-- Compra 2
INSERT OR IGNORE INTO purchase_details (id, purchase_id, product_id, quantity, unit_price, subtotal, expiry_date, batch_number) VALUES
(9, 2, 1, 50, 1800, 90000, '2026-11-30', 'LOTE-2024-009'),       -- NORAVER 50 unidades adicionales
(10, 2, 5, 30, 4500, 135000, '2025-09-30', 'LOTE-2024-010'),     -- AZITROMICINA 30 unidades (blister x3)
(11, 2, 8, 60, 3800, 228000, '2027-02-28', 'LOTE-2024-011'),     -- COMPLEJO B 60 unidades
(12, 2, 9, 40, 5000, 200000, '2026-04-30', 'LOTE-2024-012');     -- AMBROXOL 40 unidades
 */
--------------------------------------------------------------------------------
-- 12. PRODUCT BATCHES (Los triggers ya los crearon, pero validamos)
-- Si los triggers funcionaron, estos INSERT OR IGNORE no harán nada
-- Si no, los creamos manualmente
--------------------------------------------------------------------------------
/* INSERT OR IGNORE INTO product_batches (id, product_id, batch_number, expiry_date, quantity, initial_quantity, unit_cost, purchase_id, location, is_active) VALUES
(1, 1, 'LOTE-2024-001', '2026-12-31', 100, 100, 1800, 1, 'ESTANTE A-1', 1),
(2, 2, 'LOTE-2024-002', '2026-06-30', 200, 200, 400, 1, 'ESTANTE A-1', 1),
(3, 3, 'LOTE-2024-003', '2026-08-31', 150, 150, 500, 1, 'ESTANTE A-2', 1),
(4, 4, 'LOTE-2024-004', '2025-12-31', 80, 80, 800, 1, 'ESTANTE B-1', 1),
(5, 6, 'LOTE-2024-005', '2099-12-31', 96, 96, 2100, 1, 'ESTANTE C-1', 1),
(6, 7, 'LOTE-2024-006', '2027-03-31', 200, 200, 300, 1, 'ESTANTE D-1', 1),
(7, 11, 'LOTE-2024-007', '2026-01-31', 100, 100, 1200, 1, 'ESTANTE E-1', 1),
(8, 12, 'LOTE-2024-008', '2026-05-31', 80, 80, 3500, 1, 'ESTANTE E-2', 1),
(9, 1, 'LOTE-2024-009', '2026-11-30', 50, 50, 1800, 2, 'ESTANTE A-1', 1),
(10, 5, 'LOTE-2024-010', '2025-09-30', 30, 30, 4500, 2, 'ESTANTE B-2', 1),
(11, 8, 'LOTE-2024-011', '2027-02-28', 60, 60, 3800, 2, 'ESTANTE D-2', 1),
(12, 9, 'LOTE-2024-012', '2026-04-30', 40, 40, 5000, 2, 'ESTANTE C-2', 1); */

--------------------------------------------------------------------------------
-- 13. SALES (Ventas de ejemplo)
--------------------------------------------------------------------------------
/* INSERT OR IGNORE INTO sales (id, invoice_number, customer_id, user_id, cash_register_id, sale_date, subtotal, tax, discount, total, payment_method, amount_paid, change_amount, status, notes) VALUES
(1, 'FAC-202410-000001', 1, 3, 1, datetime('now', '-1 hour'), 9000, 0, 0, 9000, 'efectivo', 10000, 1000, 'completada', 'Venta de mostrador'),
(2, 'FAC-202410-000002', 2, 3, 1, datetime('now', '-30 minutes'), 15500, 0, 500, 15000, 'tarjeta', 15000, 0, 'completada', 'Venta con descuento');
 */
--------------------------------------------------------------------------------
-- 14. SALE DETAILS (Detalles de ventas - actualizarán lotes automáticamente)
--------------------------------------------------------------------------------
-- Venta 1: Cliente compra 3 sobres de NORAVER
/* INSERT OR IGNORE INTO sale_details (id, sale_id, product_id, product_presentation_id, batch_id, quantity, unit_price, discount, subtotal) VALUES
(1, 1, 1, 2, 1, 3, 3000, 0, 9000); */

-- Venta 2: Cliente compra 1 caja de DOLEX + 5 tabletas sueltas de IBUPROFENO
/* INSERT OR IGNORE INTO sale_details (id, sale_id, product_id, product_presentation_id, batch_id, quantity, unit_price, discount, subtotal) VALUES
(2, 2, 2, 3, 2, 1, 12000, 500, 11500),
(3, 2, 3, 6, 3, 5, 900, 0, 4500); */

--------------------------------------------------------------------------------
-- 15. SETTINGS (Configuraciones del sistema)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO settings (setting_key, setting_value, setting_type, description) VALUES
('pharmacy_name', 'Farmacia El Buen Precio', 'string', 'Nombre de la farmacia'),
('pharmacy_nit', '900.123.456-7', 'string', 'NIT de la farmacia'),
('pharmacy_address', 'Calle 123 #45-67, Bogotá D.C.', 'string', 'Dirección de la farmacia'),
('pharmacy_phone', '(601) 234-5678', 'string', 'Teléfono de contacto'),
('pharmacy_email', 'contacto@farmacia.com', 'string', 'Email de contacto'),
('tax_rate', '0', 'number', 'Tasa de IVA aplicable (%)'),
('low_stock_threshold', '10', 'number', 'Umbral de stock bajo'),
('expiry_alert_days', '30', 'number', 'Días de anticipación para alerta de vencimiento');

--------------------------------------------------------------------------------
-- 16. AUDIT LOGS (Registros de auditoría)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values, ip_address, user_agent) VALUES
(1, 'seed_database', 'system', NULL, NULL, '{"note":"Base de datos inicializada con datos de prueba"}', '127.0.0.1', 'SQLite-Seed-Script'),
(1, 'create_purchases', 'purchases', 1, NULL, '{"invoice":"PROV-2024-001","total":840000}', '127.0.0.1', 'SQLite-Seed-Script'),
(1, 'create_purchases', 'purchases', 2, NULL, '{"invoice":"PROV-2024-002","total":445000}', '127.0.0.1', 'SQLite-Seed-Script');

COMMIT;
