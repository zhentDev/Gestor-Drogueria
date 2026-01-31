-- =============================================
-- SCRIPT DE LIMPIEZA Y RESET DE BASE DE DATOS
-- =============================================
-- IMPORTANTE: Este script borra TODOS los datos
-- Usar solo en desarrollo/pruebas
-- =============================================

PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

-- =============================================
-- PASO 1: Eliminar datos de tablas relacionadas (orden correcto)
-- =============================================

-- Tablas dependientes de ventas
DELETE FROM cash_movements;
DELETE FROM sale_details;
DELETE FROM sales;

-- Tablas dependientes de compras
DELETE FROM purchase_details;
DELETE FROM purchases;

-- Tablas de inventario
DELETE FROM inventory_movements;
DELETE FROM price_history;

-- Tablas de productos y lotes
DELETE FROM product_batches;
DELETE FROM product_presentations;
DELETE FROM products;

-- Tablas maestras
DELETE FROM unit_types;
DELETE FROM manufacturers;
DELETE FROM categories;
DELETE FROM suppliers;
DELETE FROM customers;

-- Tablas de caja
DELETE FROM cash_registers;

-- Tablas de usuarios y seguridad
DELETE FROM refresh_tokens;
DELETE FROM users;

-- Tablas de sistema
DELETE FROM audit_logs;
DELETE FROM settings;

-- =============================================
-- PASO 2: Reiniciar contadores AUTOINCREMENT
-- =============================================
DELETE FROM sqlite_sequence;

-- =============================================
-- PASO 3: Verificar limpieza
-- =============================================
-- Puedes descomentar estas líneas para verificar
-- SELECT 'Tablas después de limpieza:' as Info;
-- SELECT name, (SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name=m.name) as registros 
-- FROM sqlite_master m WHERE type='table' AND name NOT LIKE 'sqlite_%';

COMMIT;

PRAGMA foreign_keys = ON;

-- =============================================
-- Mensaje de confirmación
-- =============================================
SELECT '✓ Base de datos limpiada exitosamente' as Resultado;
SELECT '✓ Todos los contadores reiniciados a 0' as Info;
SELECT '✓ FOREIGN_KEYS reactivadas' as Estado;