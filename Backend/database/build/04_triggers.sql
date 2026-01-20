-- =============================================
-- 1. TRIGGER: Crear lote y actualizar inventario después de una compra
-- =============================================
DROP TRIGGER IF EXISTS after_purchase_detail_insert;

CREATE TRIGGER after_purchase_detail_insert
AFTER INSERT ON purchase_details
BEGIN
    -- Crear o actualizar el lote del producto
    INSERT INTO product_batches (
        product_id, 
        batch_number, 
        expiry_date, 
        quantity, 
        initial_quantity,
        unit_cost,
        purchase_id,
        created_at,
        updated_at
    )
    VALUES (
        NEW.product_id,
        COALESCE(NEW.batch_number, 'LOTE-' || NEW.purchase_id || '-' || NEW.product_id),
        COALESCE(NEW.expiry_date, date('now', '+2 years')),
        NEW.quantity,
        NEW.quantity,
        NEW.unit_price,
        NEW.purchase_id,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    )
    ON CONFLICT(product_id, batch_number) DO UPDATE SET
        quantity = quantity + excluded.quantity,
        updated_at = CURRENT_TIMESTAMP;
    
    -- Registrar movimiento de inventario
    INSERT INTO inventory_movements (
        product_id,
        batch_id,
        movement_type,
        movement_reason,
        reference_id,
        reference_type,
        quantity_before,
        quantity_moved,
        quantity_after,
        unit_cost,
        user_id,
        movement_date
    )
    SELECT 
        NEW.product_id,
        pb.id,
        'entrada',
        'compra',
        NEW.purchase_id,
        'purchase',
        pb.quantity - NEW.quantity,
        NEW.quantity,
        pb.quantity,
        NEW.unit_price,
        pu.user_id,
        CURRENT_TIMESTAMP
    FROM product_batches pb
    INNER JOIN purchases pu ON pu.id = NEW.purchase_id
    WHERE pb.product_id = NEW.product_id 
        AND pb.batch_number = COALESCE(NEW.batch_number, 'LOTE-' || NEW.purchase_id || '-' || NEW.product_id);
    
    -- Actualizar el batch_id en purchase_details
    UPDATE purchase_details
    SET batch_id = (
        SELECT id FROM product_batches 
        WHERE product_id = NEW.product_id 
        AND batch_number = COALESCE(NEW.batch_number, 'LOTE-' || NEW.purchase_id || '-' || NEW.product_id)
        LIMIT 1
    )
    WHERE id = NEW.id AND batch_id IS NULL;
END;

DROP TRIGGER IF EXISTS after_sale_detail_insert;

CREATE TRIGGER after_sale_detail_insert
AFTER INSERT ON sale_details
BEGIN
    -- Validar que el producto del sale_detail coincida con el del batch
    SELECT RAISE(ABORT, 'El batch_id no corresponde al product_id especificado')
    WHERE NEW.batch_id IS NOT NULL 
      AND NOT EXISTS (
          SELECT 1 FROM product_batches 
          WHERE id = NEW.batch_id 
          AND product_id = NEW.product_id
      );
    
    -- Actualizar cantidad del lote específico
    UPDATE product_batches
    SET 
        quantity = quantity - (
            SELECT NEW.quantity * pp.units_per_presentation
            FROM product_presentations pp
            WHERE pp.id = NEW.product_presentation_id
        ),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.batch_id
      AND product_id = NEW.product_id;
    
    -- Registrar movimiento de inventario
    INSERT INTO inventory_movements (
        product_id,
        batch_id,
        movement_type,
        movement_reason,
        reference_id,
        reference_type,
        quantity_before,
        quantity_moved,
        quantity_after,
        user_id,
        movement_date
    )
    SELECT 
        NEW.product_id,
        NEW.batch_id,
        'salida',
        'venta',
        NEW.sale_id,
        'sale',
        pb.quantity + (NEW.quantity * pp.units_per_presentation),
        NEW.quantity * pp.units_per_presentation,
        pb.quantity,
        s.user_id,
        CURRENT_TIMESTAMP
    FROM product_batches pb
    INNER JOIN sales s ON s.id = NEW.sale_id
    INNER JOIN product_presentations pp ON pp.id = NEW.product_presentation_id
    WHERE pb.id = NEW.batch_id
      AND pb.product_id = NEW.product_id;
END;

-- =============================================
-- 3. TRIGGER: Registrar cambios de precio
-- =============================================
DROP TRIGGER IF EXISTS after_presentation_price_update;

CREATE TRIGGER after_presentation_price_update
AFTER UPDATE OF sale_price ON product_presentations
WHEN OLD.sale_price != NEW.sale_price
BEGIN
    INSERT INTO price_history (
        product_presentation_id,
        old_price,
        new_price,
        change_reason,
        effective_date
    )
    VALUES (
        NEW.id,
        OLD.sale_price,
        NEW.sale_price,
        'Actualización automática',
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 4. TRIGGER: Prevenir ventas sin stock suficiente
-- =============================================
DROP TRIGGER IF EXISTS before_sale_detail_insert;

CREATE TRIGGER before_sale_detail_insert
BEFORE INSERT ON sale_details
BEGIN
    SELECT CASE
        WHEN (
            -- Stock disponible en el lote específico o total
            SELECT COALESCE(SUM(pb.quantity), 0)
            FROM product_batches pb
            WHERE pb.product_id = NEW.product_id
                AND pb.is_active = 1
                AND (NEW.batch_id IS NULL OR pb.id = NEW.batch_id)
        ) < (
            -- Cantidad requerida en unidades base
            SELECT NEW.quantity * pp.units_per_presentation
            FROM product_presentations pp
            WHERE pp.id = NEW.product_presentation_id
        )
        THEN RAISE(ABORT, 'Stock insuficiente para realizar la venta')
    END;
END;

-- =============================================
-- VERIFICAR QUE LOS TRIGGERS SE CREARON
-- =============================================
SELECT 
    name as trigger_name,
    tbl_name as tabla,
    CASE 
        WHEN name LIKE '%before%' THEN 'BEFORE'
        WHEN name LIKE '%after%' THEN 'AFTER'
    END as timing
FROM sqlite_master 
WHERE type = 'trigger'
ORDER BY tbl_name, name;