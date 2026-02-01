PRAGMA foreign_keys = ON;

-- Tabla de Usuarios
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'vendedor', 'cajero')),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
 
-- Tabla de Categorías de Productos
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Proveedores
CREATE TABLE suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    nit VARCHAR(20) UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    contact_person VARCHAR(100),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Compras (Encabezado)
CREATE TABLE purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number VARCHAR(50),
    supplier_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'efectivo',
    status VARCHAR(20) DEFAULT 'completada',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de Detalles de Compras
CREATE TABLE purchase_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    batch_id INTEGER, -- Referencia al lote creado
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    expiry_date DATE,
    batch_number VARCHAR(50),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (batch_id) REFERENCES product_batches(id)
);

-- Tabla de Clientes
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_type VARCHAR(20) DEFAULT 'CC', -- CC, NIT, CE, etc
    document_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    birth_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Ventas (Encabezado)
CREATE TABLE sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INTEGER,
    user_id INTEGER NOT NULL,
    cash_register_id INTEGER,
    sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'efectivo',
    amount_paid DECIMAL(10,2),
    change_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'completada',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cash_register_id) REFERENCES cash_registers(id)
);

-- Detalles de venta ahora hacen referencia a presentaciones y lotes
CREATE TABLE sale_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_presentation_id INTEGER NOT NULL,
    batch_id INTEGER,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (product_presentation_id) REFERENCES product_presentations(id),
    FOREIGN KEY (batch_id) REFERENCES product_batches(id)
);

-- Tabla de Caja Registradora
CREATE TABLE cash_registers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    opening_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    closing_date DATETIME, 
    initial_amount DECIMAL(10,2) DEFAULT 0,     -- en vez de initial_balance
    sales_total DECIMAL(10,2) DEFAULT 0,       -- nuevo
    expenses_total DECIMAL(10,2) DEFAULT 0,    -- nuevo
    expected_amount DECIMAL(10,2) DEFAULT 0,   -- en vez de expected_balance
    actual_amount DECIMAL(10,2),               -- en vez de final_balance
    difference DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'open',         -- mejor en inglés, consistente con modelo
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);



-- Tabla de Movimientos de Caja
CREATE TABLE cash_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cash_register_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    movement_type VARCHAR(20) NOT NULL, -- entrada, salida, venta, gasto
    concept VARCHAR(200) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    sale_id INTEGER,
    notes TEXT,
    movement_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cash_register_id) REFERENCES cash_registers(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (sale_id) REFERENCES sales(id)
);

-- Tabla de Inventario (Kardex)
CREATE TABLE inventory_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    batch_id INTEGER, -- Movimiento específico de un lote
    movement_type VARCHAR(20) NOT NULL, -- entrada, salida, ajuste
    movement_reason VARCHAR(50) NOT NULL, -- compra, venta, ajuste, devolucion, vencimiento
    reference_id INTEGER,
    reference_type VARCHAR(20), -- purchase, sale
    quantity_before INTEGER NOT NULL,
    quantity_moved INTEGER NOT NULL,
    quantity_after INTEGER NOT NULL,
    unit_cost DECIMAL(10,2),
    user_id INTEGER NOT NULL,
    notes TEXT,
    movement_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (batch_id) REFERENCES product_batches(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Tabla de Logs de Auditoría
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50),
    record_id INTEGER,
    old_values TEXT,
    new_values TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de Configuración del Sistema
CREATE TABLE settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20), -- string, number, boolean, json
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
--Tabla de tokens
CREATE TABLE refresh_tokens (
    id TEXT PRIMARY KEY,                -- guardas UUID como texto
    token_hash TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    revoked INTEGER DEFAULT 0,          -- BOOLEAN se maneja como 0/1
    replaced_by_token_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Tabla de Fabricantes/Laboratorios
CREATE TABLE manufacturers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(50) UNIQUE,
    country VARCHAR(100),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barcode VARCHAR(50) UNIQUE NOT NULL, -- CODIGO_BARRAS
    name VARCHAR(300) NOT NULL, -- NOMBRE_PRODUCTO
    description TEXT,
    category_id INTEGER,
    manufacturer_id INTEGER, -- FABRICANTE
    invima_registry VARCHAR(50), -- INVIMA (Registro sanitario)
    requires_prescription BOOLEAN DEFAULT 0,
    location VARCHAR(100), -- UBICACION en farmacia
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id)
);

-- Tabla de Unidades de Medida/Presentaciones
CREATE TABLE unit_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE, -- UNIDAD, CAJA, BLISTER, FRASCO, etc.
    abbreviation VARCHAR(10),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Presentaciones del Producto
-- Un producto puede venderse en diferentes presentaciones
CREATE TABLE product_presentations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    unit_type_id INTEGER NOT NULL, -- UNIDAD, CAJA, etc.
    units_per_presentation INTEGER DEFAULT 1, -- Ej: 1 CAJA = 10 UNIDADES
    barcode VARCHAR(50) UNIQUE, -- Código de barras específico de esta presentación
    sale_price DECIMAL(10,2) NOT NULL, -- PVP (Precio de Venta al Público)
    is_default BOOLEAN DEFAULT 0, -- Presentación por defecto para ventas
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_type_id) REFERENCES unit_types(id),
    UNIQUE(product_id, unit_type_id)
);

-- Tabla de Lotes de Productos
-- Control de inventario por lote con fecha de vencimiento
CREATE TABLE product_batches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    batch_number VARCHAR(50) NOT NULL, -- Número de lote
    expiry_date DATE NOT NULL, -- Fecha de vencimiento
    quantity INTEGER NOT NULL DEFAULT 0, -- Cantidad actual en el lote
    initial_quantity INTEGER NOT NULL, -- Cantidad inicial del lote
    unit_cost DECIMAL(10,2) NOT NULL, -- Costo unitario de este lote
    purchase_id INTEGER, -- Referencia a la compra original
    location VARCHAR(100), -- Ubicación específica del lote
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    UNIQUE(product_id, batch_number)
);

-- Tabla de Historial de Precios
-- Mantiene registro de cambios de precios por presentación
CREATE TABLE price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_presentation_id INTEGER NOT NULL,
    old_price DECIMAL(10,2),
    new_price DECIMAL(10,2) NOT NULL,
    change_reason VARCHAR(200),
    user_id INTEGER,
    effective_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_presentation_id) REFERENCES product_presentations(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);