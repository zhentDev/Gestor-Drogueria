PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- 1. Insertar encabezado de venta
INSERT OR IGNORE INTO sales (id, invoice_number, customer_id, user_id, cash_register_id, sale_date, subtotal, tax, discount, total, payment_method, amount_paid, change_amount, status, notes) VALUES
(1, 'FAC-202410-000003', 1, 1, 1, datetime('now', '-30 minutes'), 15500, 0, 500, 15000, 'tarjeta', 15000, 0, 'completada', 'Venta con descuento');

-- Venta 2: Cliente compra 1 caja de DOLEX + 5 tabletas sueltas de IBUPROFENO
INSERT INTO sale_details (id, sale_id, product_id, product_presentation_id, batch_id, quantity, unit_price, discount, subtotal) VALUES
(3, 1, 9, 3, 2, 1, 12000, 500, 11500);
-- (2, 1, 3, 6, 3, 5, 900, 0, 4500);

COMMIT;
