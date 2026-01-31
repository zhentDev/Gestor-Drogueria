-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_manufacturer ON products(manufacturer_id);
CREATE INDEX idx_product_presentations_product ON product_presentations(product_id);
CREATE INDEX idx_product_batches_product ON product_batches(product_id);
CREATE INDEX idx_product_batches_expiry ON product_batches(expiry_date);
CREATE INDEX idx_purchase_details_purchase ON purchase_details(purchase_id);
CREATE INDEX idx_purchase_details_product ON purchase_details(product_id);
CREATE INDEX idx_sale_details_sale ON sale_details(sale_id);
CREATE INDEX idx_sale_details_product ON sale_details(product_id);
CREATE INDEX idx_inventory_movements_product ON inventory_movements(product_id);
CREATE INDEX idx_inventory_movements_batch ON inventory_movements(batch_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_purchases_date ON purchases(purchase_date);