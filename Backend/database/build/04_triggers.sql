-- =============================================
-- 1. TRIGGER: Crear lote y actualizar inventario después de una compra
-- =============================================
DROP TRIGGER IF EXISTS after_purchase_detail_insert;


CREATE TRIGGER after_purchase_detail_insert
AFTER INSERT ON purchase_details
-- AQUÍ ESTÁ LA MAGIA: Solo se ejecuta si la compra padre es 'completada'
WHEN (SELECT status FROM purchases WHERE id = NEW.purchase_id) = 'completada'
BEGIN
    -- 1. Crear o actualizar el lote (Misma lógica tuya)
    INSERT INTO product_batches (
        product_id, batch_number, expiry_date, quantity, initial_quantity,
        unit_cost, purchase_id, location, is_active, created_at, updated_at
    )
    VALUES (
        NEW.product_id,
        COALESCE(NEW.batch_number, 'LOTE-' || NEW.purchase_id || '-' || NEW.product_id),
        COALESCE(NEW.expiry_date, date('now', '+2 years')),
        NEW.quantity, NEW.quantity, NEW.unit_price, NEW.purchase_id,
        (SELECT location FROM products WHERE id = NEW.product_id),
        1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    ON CONFLICT(product_id, batch_number) DO UPDATE SET
        quantity = quantity + excluded.quantity,
        updated_at = CURRENT_TIMESTAMP;
    
    -- 2. Actualizar el batch_id en el detalle
    UPDATE purchase_details
    SET batch_id = (
        SELECT id FROM product_batches 
        WHERE product_id = NEW.product_id 
        AND batch_number = COALESCE(NEW.batch_number, 'LOTE-' || NEW.purchase_id || '-' || NEW.product_id)
        LIMIT 1
    )
    WHERE id = NEW.id;
    
    -- 3. Registrar movimiento
    INSERT INTO inventory_movements (
        product_id, batch_id, movement_type, movement_reason,
        reference_id, reference_type, quantity_before, quantity_moved,
        quantity_after, unit_cost, user_id, movement_date
    )
    SELECT 
        NEW.product_id, pb.id, 'entrada', 'compra',
        NEW.purchase_id, 'purchase', pb.quantity - NEW.quantity, NEW.quantity,
        pb.quantity, NEW.unit_price, 
        (SELECT user_id FROM purchases WHERE id = NEW.purchase_id),
        CURRENT_TIMESTAMP
    FROM product_batches pb
    WHERE pb.product_id = NEW.product_id 
      AND pb.batch_number = COALESCE(NEW.batch_number, 'LOTE-' || NEW.purchase_id || '-' || NEW.product_id);
END;


DROP TRIGGER IF EXISTS after_purchase_status_completed;

CREATE TRIGGER after_purchase_status_completed
AFTER UPDATE OF status ON purchases
WHEN NEW.status = 'completada' AND OLD.status != 'completada'
BEGIN
    -- A. Generar Lotes para TODOS los detalles de esta compra
    INSERT INTO product_batches (
        product_id, batch_number, expiry_date, quantity, initial_quantity,
        unit_cost, purchase_id, location, is_active, created_at, updated_at
    )
    SELECT 
        pd.product_id,
        COALESCE(pd.batch_number, 'LOTE-' || pd.purchase_id || '-' || pd.product_id),
        COALESCE(pd.expiry_date, date('now', '+2 years')),
        pd.quantity, pd.quantity, pd.unit_price, pd.purchase_id,
        (SELECT location FROM products WHERE id = pd.product_id),
        1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM purchase_details pd
    WHERE pd.purchase_id = NEW.id
    ON CONFLICT(product_id, batch_number) DO UPDATE SET
        quantity = quantity + excluded.quantity,
        updated_at = CURRENT_TIMESTAMP;

    -- B. Vincular los batch_id recién creados a los detalles de compra
    UPDATE purchase_details
    SET batch_id = (
        SELECT pb.id 
        FROM product_batches pb
        WHERE pb.product_id = purchase_details.product_id
        AND pb.batch_number = COALESCE(purchase_details.batch_number, 'LOTE-' || purchase_details.purchase_id || '-' || purchase_details.product_id)
    )
    WHERE purchase_id = NEW.id;

    -- C. Registrar Movimientos masivos
    INSERT INTO inventory_movements (
        product_id, batch_id, movement_type, movement_reason,
        reference_id, reference_type, quantity_before, quantity_moved,
        quantity_after, unit_cost, user_id, movement_date
    )
    SELECT 
        pb.product_id, pb.id, 'entrada', 'compra_confirmada',
        NEW.id, 'purchase', pb.quantity - pd.quantity, pd.quantity,
        pb.quantity, pd.unit_price, NEW.user_id, CURRENT_TIMESTAMP
    FROM purchase_details pd
    JOIN product_batches pb ON pb.id = pd.batch_id
    WHERE pd.purchase_id = NEW.id;
END;


DROP TRIGGER IF EXISTS after_purchase_status_reverted;

CREATE TRIGGER after_purchase_status_reverted
AFTER UPDATE OF status ON purchases
WHEN NEW.status != 'completada' AND OLD.status = 'completada'
BEGIN
    -- 1. Restar inventario de los lotes asociados
    UPDATE product_batches
    SET quantity = quantity - (
        SELECT quantity FROM purchase_details 
        WHERE batch_id = product_batches.id AND purchase_id = NEW.id
    ),
    is_active = CASE WHEN (quantity - (
        SELECT quantity FROM purchase_details 
        WHERE batch_id = product_batches.id AND purchase_id = NEW.id
    )) <= 0 THEN 0 ELSE is_active END
    WHERE id IN (SELECT batch_id FROM purchase_details WHERE purchase_id = NEW.id);

    -- 2. Registrar movimientos de salida (reversión)
    INSERT INTO inventory_movements (
        product_id, batch_id, movement_type, movement_reason,
        reference_id, reference_type, quantity_before, quantity_moved,
        quantity_after, unit_cost, user_id, movement_date
    )
    SELECT 
        pd.product_id, pd.batch_id, 'salida', 'anulacion_compra_estado',
        NEW.id, 'purchase_revert', 
        pb.quantity + pd.quantity, -- Era lo que había antes de restar
        pd.quantity,
        pb.quantity, -- Lo que quedó ahora
        pd.unit_price, NEW.user_id, CURRENT_TIMESTAMP
    FROM purchase_details pd
    JOIN product_batches pb ON pb.id = pd.batch_id
    WHERE pd.purchase_id = NEW.id;
END;
-- =============================================
-- 1B. TRIGGER: Revertir inventario al eliminar detalle de compra
-- =============================================
DROP TRIGGER IF EXISTS after_purchase_detail_delete;

CREATE TRIGGER after_purchase_detail_delete
AFTER DELETE ON purchase_details
BEGIN
    -- 1. Reducir cantidad del lote (revertir la entrada)
    UPDATE product_batches
    SET 
        quantity = quantity - OLD.quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.batch_id
      AND product_id = OLD.product_id;
    
    -- 2. Registrar movimiento de inventario (salida por anulación)
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
        movement_date,
        created_at,
        updated_at
    )
    SELECT 
        OLD.product_id,
        OLD.batch_id,
        'salida',
        'anulacion_compra',
        OLD.purchase_id,
        'purchase_delete',
        pb.quantity + OLD.quantity,
        OLD.quantity,
        pb.quantity,
        OLD.unit_price,
        pu.user_id,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    FROM product_batches pb
    INNER JOIN purchases pu ON pu.id = OLD.purchase_id
    WHERE pb.id = OLD.batch_id
      AND pb.product_id = OLD.product_id;
    
    -- 3. Si el lote queda en cero, marcarlo como inactivo
    UPDATE product_batches
    SET 
        is_active = 0,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.batch_id
      AND quantity <= 0;
END;

-- =============================================
-- 2. TRIGGER: Actualizar inventario después de una venta
-- =============================================
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
-- 2B. TRIGGER: Revertir inventario al eliminar detalle de venta
-- =============================================
DROP TRIGGER IF EXISTS after_sale_detail_delete;

CREATE TRIGGER after_sale_detail_delete
AFTER DELETE ON sale_details
BEGIN
    -- 1. Devolver cantidad al lote (revertir la salida)
    UPDATE product_batches
    SET 
        quantity = quantity + (
            SELECT OLD.quantity * pp.units_per_presentation
            FROM product_presentations pp
            WHERE pp.id = OLD.product_presentation_id
        ),
        is_active = 1, -- Reactivar lote si estaba inactivo
        updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.batch_id
      AND product_id = OLD.product_id;
    
    -- 2. Registrar movimiento de inventario (entrada por anulación)
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
        movement_date,
        created_at,
        updated_at
    )
    SELECT 
        OLD.product_id,
        OLD.batch_id,
        'entrada',
        'anulacion_venta',
        OLD.sale_id,
        'sale_delete',
        pb.quantity - (OLD.quantity * pp.units_per_presentation),
        OLD.quantity * pp.units_per_presentation,
        pb.quantity,
        s.user_id,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    FROM product_batches pb
    INNER JOIN sales s ON s.id = OLD.sale_id
    INNER JOIN product_presentations pp ON pp.id = OLD.product_presentation_id
    WHERE pb.id = OLD.batch_id
      AND pb.product_id = OLD.product_id;
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
    END as timing,
    CASE
        WHEN name LIKE '%insert%' THEN 'INSERT'
        WHEN name LIKE '%update%' THEN 'UPDATE'
        WHEN name LIKE '%delete%' THEN 'DELETE'
    END as operation
FROM sqlite_master 
WHERE type = 'trigger'
ORDER BY tbl_name, name;