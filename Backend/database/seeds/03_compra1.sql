PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- 1. Insertar encabezado de compra
INSERT INTO purchases (
    invoice_number, supplier_id, user_id, subtotal, tax, discount, total, payment_method
) VALUES (
    'FC-1001', 1, 1, 50000, 9500, 0, 59500, 'efectivo'
);

-- 2. Insertar detalle (producto comprado)
INSERT INTO purchase_details (
    purchase_id, product_id, quantity, unit_price, subtotal, expiry_date, batch_number
) VALUES (
    (SELECT id FROM purchases WHERE invoice_number = 'FC-1001'), -- id de la compra
    1,      -- id del producto
    50,     -- cantidad
    1000,   -- precio unitario
    50000,  -- subtotal
    '2026-12-31', -- fecha de vencimiento
    'Lote-A1'
);

COMMIT;
