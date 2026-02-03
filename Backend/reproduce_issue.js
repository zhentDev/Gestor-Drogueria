const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = ':memory:'; // Use in-memory DB for reproduction
const db = new sqlite3.Database(dbPath);

const tablesSql = fs.readFileSync(path.join(__dirname, 'database/build/01_tables.sql'), 'utf8');
const triggersSql = fs.readFileSync(path.join(__dirname, 'database/build/04_triggers.sql'), 'utf8');

function runAsync(sql) {
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

function getAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function allAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function main() {
    try {
        console.log('--- Setting up Database ---');
        await runAsync(tablesSql);
        console.log('Tables created.');
        await runAsync(triggersSql);
        console.log('Triggers created.');

        console.log('--- Seeding Data ---');
        // 1. Dependencies
        await runAsync(`
            INSERT INTO users (username, password, name) VALUES ('testuser', 'pass', 'Test User');
            INSERT INTO suppliers (name, nit) VALUES ('Test Supplier', '12345');
            INSERT INTO categories (name) VALUES ('Test Category');
            INSERT INTO manufacturers (name) VALUES ('Test Manufacturer');
            INSERT INTO unit_types (name) VALUES ('UNIDAD');
            INSERT INTO customers (document_number, full_name) VALUES ('111', 'Test Customer');
            INSERT INTO cash_registers (user_id, status) VALUES (1, 'open');
        `);

        // 2. Product
        await runAsync(`
            INSERT INTO products (barcode, name, category_id, manufacturer_id) 
            VALUES ('CODE123', 'Test Product', 1, 1);
        `);
        const product = await getAsync("SELECT * FROM products WHERE barcode = 'CODE123'");
        
        // 3. Presentation
        await runAsync(`
            INSERT INTO product_presentations (product_id, unit_type_id, sale_price) 
            VALUES (${product.id}, 1, 1000);
        `);
        const presentation = await getAsync(`SELECT * FROM product_presentations WHERE product_id = ${product.id}`);

        console.log('--- Executing Purchase (Validating Purchase Trigger) ---');
        // 4. Purchase (to get stock)
        await runAsync(`
            INSERT INTO purchases (supplier_id, user_id, total, status) 
            VALUES (1, 1, 500, 'pendiente');
        `);
        const purchase = await getAsync("SELECT * FROM purchases ORDER BY id DESC LIMIT 1");
        
        await runAsync(`
            INSERT INTO purchase_details (purchase_id, product_id, quantity, unit_price, subtotal)
            VALUES (${purchase.id}, ${product.id}, 10, 50, 500);
        `);
        
        // Complete purchase to trigger stock update
        await runAsync(`UPDATE purchases SET status = 'completada' WHERE id = ${purchase.id}`);
        
        const batch = await getAsync(`SELECT * FROM product_batches WHERE product_id = ${product.id}`);
        console.log('Batch created:', batch);

        const purchaseMoves = await allAsync(`SELECT * FROM inventory_movements WHERE product_id = ${product.id}`);
        console.log('Purchase Inventory Movements:', purchaseMoves.length);
        if (purchaseMoves.length === 0) console.error('ERROR: No inventory movement for purchase!');
        else console.log('Purchase trigger working OK.');

        console.log('--- Executing Sale (Validating Sale Trigger) ---');
        // 5. Sale
        await runAsync(`
            INSERT INTO sales (invoice_number, user_id, customer_id, cash_register_id, total, status)
            VALUES ('SALE-001', 1, 1, 1, 2000, 'pendiente');
        `);
        const sale = await getAsync("SELECT * FROM sales ORDER BY id DESC LIMIT 1");

        await runAsync(`
            INSERT INTO sale_details (sale_id, product_id, product_presentation_id, quantity, unit_price, subtotal)
            VALUES (${sale.id}, ${product.id}, ${presentation.id}, 2, 1000, 2000);
        `);

        // Complete sale
        console.log('Updating sale status to completada...');
        await runAsync(`UPDATE sales SET status = 'completada' WHERE id = ${sale.id}`);

        // Check movements
        const saleMoves = await allAsync(`SELECT * FROM inventory_movements WHERE reference_id = ${sale.id} AND reference_type = 'sale'`);
        console.log('Sale Inventory Movements:', saleMoves);
        
        if (saleMoves.length > 0) {
            console.log('SUCCESS: Sale inventory movement created.');
        } else {
            console.error('FAILURE: No inventory movement created for sale!');
        }

        // Check batch quantity
        const updatedBatch = await getAsync(`SELECT * FROM product_batches WHERE id = ${batch.id}`);
        console.log('Batch Quantity Before Sale:', batch.quantity);
        console.log('Batch Quantity After Sale:', updatedBatch.quantity);

    } catch (err) {
        console.error('An error occurred:', err);
        console.error('Error message:', err.message);
        if (err.stack) console.error('Stack:', err.stack);
    } finally {
        db.close();
    }
}

main();
