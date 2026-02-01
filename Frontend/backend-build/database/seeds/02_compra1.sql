PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;

INSERT INTO purchases (id, invoice_number, supplier_id, user_id, purchase_date, subtotal, tax, discount, total, payment_method, status, notes)
VALUES (1, 'PROV-2024-001', 1, 1, datetime('now', '-30 days'), 850000, 0, 10000, 840000, 'transferencia', 'completada', 'Compra inicial de inventario');
-- si esto falla te dará el error (p. ej. FOREIGN KEY constraint failed)

INSERT INTO purchase_details (id, purchase_id, product_id, quantity, unit_price, subtotal, expiry_date, batch_number)
VALUES
(1, 1, 9, 40, 5000, 200000, '2026-04-30', 'LOTE-2024-012'),
(2, 1, 3, 40, 5000, 200000, '2026-04-30', 'LOTE-2024-012');

COMMIT;