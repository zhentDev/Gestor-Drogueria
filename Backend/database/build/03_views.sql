
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
