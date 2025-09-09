PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Borrar registros en el orden correcto (por claves foráneas)
DELETE FROM cash_movements;
DELETE FROM inventory_movements;
DELETE FROM sale_details;
DELETE FROM sales;
DELETE FROM purchase_details;
DELETE FROM purchases;
DELETE FROM cash_registers;
DELETE FROM customers;
DELETE FROM products;
DELETE FROM suppliers;
DELETE FROM categories;
DELETE FROM users;

-- Opcional: limpiar logs y configuración de prueba
DELETE FROM audit_logs;
DELETE FROM settings;

-- Reiniciar contadores AUTOINCREMENT
DELETE FROM sqlite_sequence;

COMMIT;
