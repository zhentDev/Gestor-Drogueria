-- =============================================
-- SISTEMA DE GESTIÓN DE FARMACIA
-- Base de Datos: SQLite
-- =============================================

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

-- Tabla de Productos
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INTEGER,
    unit VARCHAR(20) DEFAULT 'unidad', -- unidad, caja, blister, etc
    purchase_price DECIMAL(10,2) DEFAULT 0,
    sale_price DECIMAL(10,2) NOT NULL,
    min_stock INTEGER DEFAULT 10,
    current_stock INTEGER DEFAULT 0,
    max_stock INTEGER DEFAULT 1000,
    location VARCHAR(50), -- ubicación en farmacia
    requires_prescription BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
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
    status VARCHAR(20) DEFAULT 'completada', -- completada, pendiente, cancelada
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
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    expiry_date DATE,
    batch_number VARCHAR(50),
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
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
    payment_method VARCHAR(20) DEFAULT 'efectivo', -- efectivo, tarjeta, transferencia
    amount_paid DECIMAL(10,2),
    change_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'completada', -- completada, anulada, devuelta
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cash_register_id) REFERENCES cash_registers(id)
);

-- Tabla de Detalles de Ventas
CREATE TABLE sale_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla de Caja Registradora
CREATE TABLE cash_registers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    opening_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    closing_date DATETIME,
    initial_balance DECIMAL(10,2) NOT NULL,
    final_balance DECIMAL(10,2),
    expected_balance DECIMAL(10,2),
    difference DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'abierta', -- abierta, cerrada
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
    movement_type VARCHAR(20) NOT NULL, -- entrada, salida, ajuste
    movement_reason VARCHAR(50) NOT NULL, -- compra, venta, ajuste, devolucion, vencimiento
    reference_id INTEGER, -- ID de compra o venta
    reference_type VARCHAR(20), -- purchase, sale
    quantity_before INTEGER NOT NULL,
    quantity_moved INTEGER NOT NULL,
    quantity_after INTEGER NOT NULL,
    unit_cost DECIMAL(10,2),
    user_id INTEGER NOT NULL,
    notes TEXT,
    movement_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de Logs de Auditoría
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50),
    record_id INTEGER,
    old_values TEXT, -- JSON
    new_values TEXT, -- JSON
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

-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================

CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_stock ON products(current_stock);

CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_sales_customer ON sales(customer_id);
CREATE INDEX idx_sales_user ON sales(user_id);
CREATE INDEX idx_sales_invoice ON sales(invoice_number);

CREATE INDEX idx_purchases_date ON purchases(purchase_date);
CREATE INDEX idx_purchases_supplier ON purchases(supplier_id);

CREATE INDEX idx_inventory_product ON inventory_movements(product_id);
CREATE INDEX idx_inventory_date ON inventory_movements(movement_date);

CREATE INDEX idx_cash_movements_register ON cash_movements(cash_register_id);
CREATE INDEX idx_cash_movements_date ON cash_movements(movement_date);

-- =============================================
-- VISTAS ÚTILES
-- =============================================

-- Vista de productos con stock bajo
CREATE VIEW low_stock_products AS
SELECT 
    p.id,
    p.code,
    p.name,
    p.current_stock,
    p.min_stock,
    c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.current_stock <= p.min_stock AND p.is_active = 1;

-- Vista de ventas del día
CREATE VIEW today_sales AS
SELECT 
    s.id,
    s.invoice_number,
    s.total,
    s.sale_date,
    c.full_name as customer_name,
    u.full_name as seller_name
FROM sales s
LEFT JOIN customers c ON s.customer_id = c.id
LEFT JOIN users u ON s.user_id = u.id
WHERE DATE(s.sale_date) = DATE('now', 'localtime')
AND s.status = 'completada';

-- Vista de resumen financiero
CREATE VIEW financial_summary AS
SELECT 
    DATE(sale_date) as date,
    COUNT(*) as total_sales,
    SUM(total) as total_revenue,
    SUM(subtotal) as subtotal_revenue,
    SUM(tax) as total_tax,
    SUM(discount) as total_discount
FROM sales
WHERE status = 'completada'
GROUP BY DATE(sale_date);

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

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Usuario administrador por defecto (password: admin123)
INSERT INTO users (username, password, full_name, email, role) 
VALUES ('admin', '$2b$10$YourHashedPasswordHere', 'Administrador', 'admin@farmacia.com', 'admin');

-- Configuraciones iniciales
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('company_name', 'Farmacia XYZ', 'string', 'Nombre de la empresa'),
('company_nit', '900123456-7', 'string', 'NIT de la empresa'),
('company_address', 'Calle 123 #45-67', 'string', 'Dirección de la empresa'),
('company_phone', '(+57) 301 234 5678', 'string', 'Teléfono de la empresa'),
('tax_rate', '19', 'number', 'Porcentaje de IVA'),
('invoice_prefix', 'FV', 'string', 'Prefijo para facturas de venta'),
('low_stock_alert', '10', 'number', 'Cantidad mínima para alerta de stock');

-- Categorías básicas
INSERT INTO categories (name, description) VALUES
('Medicamentos', 'Medicamentos con y sin prescripción'),
('Cuidado Personal', 'Productos de higiene y cuidado personal'),
('Bebés', 'Productos para bebés'),
('Vitaminas', 'Vitaminas y suplementos'),
('Primeros Auxilios', 'Material de primeros auxilios');