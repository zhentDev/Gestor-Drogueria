-- 00_seed_primary_tables.sql
PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;

--------------------------------------------------------------------------------
-- CATEGORIES (asegura ids 1..5 si están vacías)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO categories (name, description) VALUES
('Analgésicos', 'Medicamentos para el dolor y la fiebre'),
('Antibióticos', 'Medicamentos bajo prescripción para infecciones bacterianas'),
('Jarabes', 'Jarabes para tos, expectorantes y antitusivos'),
('Vitaminas y Suplementos', 'Vitaminas, minerales y suplementos dietarios'),
('Otros', 'Productos generales: antisepticos, vendas, cuidado personal');

--------------------------------------------------------------------------------
-- SUPPLIERS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO suppliers (name, nit, phone, email, address, contact_person, is_active)
VALUES
('Laboratorios Genéricos S.A.', '900123111', '(+57)3201112222', 'ventas@genericos.example', 'Cra 10 #20-30, Bogotá', 'Carlos Ruiz', 1),
('Distribuidora Salud Total', '900987222', '(+57)3109876543', 'contacto@saludtotal.example', 'Av 68 #45-67, Bogotá', 'Marta Gómez', 1),
('FarmacoMayoristas SAS', '900555333', '(+57)3115553333', 'ventas@farmacom.example', 'Cll 5 #12-34, Bogotá', 'Luis Torres', 1);

--------------------------------------------------------------------------------
-- PRODUCTS (current_stock = 0)
-- Usa category_id buscándolo por name para no depender de id numerico fijo.
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO products (code, name, description, category_id, unit, purchase_price, sale_price, min_stock, current_stock, max_stock, location, requires_prescription, is_active)
VALUES
('PRD-PARA-500', 'Paracetamol 500 mg - 20 tabs', 'Paracetamol 500 mg, caja x20', (SELECT id FROM categories WHERE name='Analgésicos'), 'unidad', 800, 1500, 10, 0, 200, 'A1-01', 0, 1),
('PRD-IBU-400', 'Ibuprofeno 400 mg - 20 tabs', 'Ibuprofeno 400 mg, caja x20', (SELECT id FROM categories WHERE name='Analgésicos'), 'unidad', 900, 1700, 10, 0, 200, 'A1-02', 0, 1),
('PRD-DICL-50', 'Diclofenaco 50 mg - 10 tabs', 'Diclofenaco 50 mg, blister x10', (SELECT id FROM categories WHERE name='Analgésicos'), 'unidad', 1100, 2100, 8, 0, 150, 'A1-03', 0, 1),

('PRD-AMOX-500', 'Amoxicilina 500 mg - 20 caps', 'Amoxicilina 500 mg, frasco x20', (SELECT id FROM categories WHERE name='Antibióticos'), 'unidad', 6000, 9000, 5, 0, 100, 'B1-01', 1, 1),
('PRD-AZIT-500', 'Azitromicina 500 mg - 3 tabs', 'Azitromicina 500 mg, blíster x3', (SELECT id FROM categories WHERE name='Antibióticos'), 'unidad', 12000, 16000, 3, 0, 50, 'B1-02', 1, 1),

('PRD-AMBRX', 'Ambroxol jarabe 120 ml', 'Jarabe mucolítico 120 ml', (SELECT id FROM categories WHERE name='Jarabes'), 'unidad', 3500, 7000, 5, 0, 80, 'C1-01', 0, 1),
('PRD-LORAT-60', 'Loratadina jarabe 60 ml', 'Jarabe antihistamínico 60 ml', (SELECT id FROM categories WHERE name='Jarabes'), 'unidad', 3000, 6500, 5, 0, 80, 'C1-02', 0, 1),

('PRD-VITC-500', 'Vitamina C 500 mg - 20 tabs', 'Vitamina C 500 mg, caja x20', (SELECT id FROM categories WHERE name='Vitaminas y Suplementos'), 'unidad', 4000, 8000, 10, 0, 150, 'D1-01', 0, 1),
('PRD-BCOMPL', 'Complejo B - 30 caps', 'Complejo vitamínico B, frasco x30', (SELECT id FROM categories WHERE name='Vitaminas y Suplementos'), 'unidad', 5500, 10000, 8, 0, 150, 'D1-02', 0, 1),

('PRD-ALC70', 'Alcohol antiséptico 70% - 120 ml', 'Alcohol 70% frasco 120 ml', (SELECT id FROM categories WHERE name='Otros'), 'unidad', 1200, 3000, 20, 0, 300, 'E1-01', 0, 1),
('PRD-GEL250', 'Gel antibacterial 250 ml', 'Gel antibacterial 250 ml con aloe', (SELECT id FROM categories WHERE name='Otros'), 'unidad', 3500, 7000, 20, 0, 200, 'E1-02', 0, 1);

--------------------------------------------------------------------------------
-- USERS
-- (INSERT OR IGNORE para evitar duplicados si se corre varias veces)
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO users (username, password, full_name, email, role, is_active)
VALUES
('admin', '$2b$10$dev_admin_hash', 'Administrador Dev', 'admin@dev.local', 'admin', 1),
('vendedor1', '$2b$10$dev_vendedor_hash', 'Vendedor Demo', 'vendedor@dev.local', 'vendedor', 1),
('cajero1', '$2b$10$dev_cajero_hash', 'Cajero Demo', 'cajero@dev.local', 'cajero', 1);

--------------------------------------------------------------------------------
-- CUSTOMERS
--------------------------------------------------------------------------------
INSERT OR IGNORE INTO customers (document_type, document_number, full_name, phone, email, address, birth_date)
VALUES
('CC', '1000001', 'Juan Pérez', '3001001001', 'juan.perez@demo.local', 'Cll 10 #20-30', '1985-04-12'),
('CC', '1000002', 'María Gómez', '3002002002', 'maria.gomez@demo.local', 'Cll 12 #22-34', '1990-09-23'),
('NIT','900111222', 'Empresa Demo S.A.', '6010001000', 'contacto@empresademo.local', 'Av 1 #1-01', NULL);

--------------------------------------------------------------------------------
-- CASH_REGISTER (una sola, correspondiente al usuario cajero1 / día actual)
-- Si ya existe una caja abierta para cajero1 hoy, no creamos una nueva: usamos INSERT OR IGNORE
-- Para INSERT OR IGNORE necesitamos una columna única; como no hay, chequeamos existencia y sólo insertamos si no hay una abierta hoy.
--------------------------------------------------------------------------------
-- Primero, buscamos user_id del cajero
-- Nota: este bloque hará un INSERT sólo si no existe una caja abierta con created_at hoy para ese user.
INSERT INTO cash_registers (user_id, opening_date, initial_balance, status, notes)
SELECT u.id, datetime('now','localtime'), 100000.00, 'abierta', 'Apertura automática dev'
FROM users u
WHERE u.username = 'cajero1'
  AND NOT EXISTS (
    SELECT 1 FROM cash_registers cr
    WHERE cr.user_id = u.id
      AND DATE(cr.opening_date, 'localtime') = DATE('now','localtime')
      AND cr.status = 'abierta'
  );

--------------------------------------------------------------------------------
-- AUDIT_LOGS (ejemplos simples)
--------------------------------------------------------------------------------
-- Obtén id de admin y cajero para referencias
WITH admin AS (SELECT id AS uid FROM users WHERE username = 'admin' LIMIT 1),
     cajero AS (SELECT id AS uid FROM users WHERE username = 'cajero1' LIMIT 1)
INSERT OR IGNORE INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values, ip_address, user_agent)
SELECT admin.uid, 'seed_insert', 'users', NULL, NULL, '{"note":"seed admin inserted"}', '127.0.0.1', 'seed-script'
FROM admin
UNION ALL
SELECT cajero.uid, 'seed_insert', 'cash_registers', NULL, NULL, '{"note":"seed caja opened"}', '127.0.0.1', 'seed-script'
FROM cajero;

COMMIT;
