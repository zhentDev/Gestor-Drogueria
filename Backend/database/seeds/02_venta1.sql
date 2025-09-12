PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- 1. Insertar encabezado de venta
INSERT INTO sales (
    invoice_number, customer_id, user_id, cash_register_id,
    subtotal, tax, discount, total, payment_method, amount_paid, change_amount
) VALUES (
    'FV-2001', 1, 1, 1,
    20000, 3800, 0, 23800, 'efectivo', 25000, 1200
);

-- 2. Insertar detalle (producto vendido)
INSERT INTO sale_details (
    sale_id, product_id, quantity, unit_price, discount, subtotal
) VALUES (
    (SELECT id FROM sales WHERE invoice_number = 'FV-2001'),
    1,     -- id del producto
    2,     -- cantidad
    10000, -- precio unitario
    0,     -- descuento
    20000  -- subtotal
);

COMMIT;
