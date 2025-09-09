-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger para actualizar stock después de una compra
CREATE TRIGGER after_purchase_detail_insert
AFTER INSERT ON purchase_details
BEGIN
    UPDATE products 
    SET current_stock = current_stock + NEW.quantity,
        purchase_price = NEW.unit_price,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.product_id;
    
    INSERT INTO inventory_movements (
        product_id, movement_type, movement_reason, 
        reference_id, reference_type, quantity_before, 
        quantity_moved, quantity_after, unit_cost, user_id
    )
    SELECT 
        NEW.product_id, 'entrada', 'compra',
        NEW.purchase_id, 'purchase', 
        p.current_stock - NEW.quantity,
        NEW.quantity,
        p.current_stock,
        NEW.unit_price,
        pu.user_id
    FROM products p, purchases pu
    WHERE p.id = NEW.product_id AND pu.id = NEW.purchase_id;
END;

-- Trigger para actualizar stock después de una venta
CREATE TRIGGER after_sale_detail_insert
AFTER INSERT ON sale_details
BEGIN
    UPDATE products 
    SET current_stock = current_stock - NEW.quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.product_id;
    
    INSERT INTO inventory_movements (
        product_id, movement_type, movement_reason, 
        reference_id, reference_type, quantity_before, 
        quantity_moved, quantity_after, user_id
    )
    SELECT 
        NEW.product_id, 'salida', 'venta',
        NEW.sale_id, 'sale', 
        p.current_stock + NEW.quantity,
        NEW.quantity,
        p.current_stock,
        s.user_id
    FROM products p, sales s
    WHERE p.id = NEW.product_id AND s.id = NEW.sale_id;
END;
