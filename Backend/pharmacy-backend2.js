// =============================================
// ROUTES
// =============================================

// ==========================================
// routes/auth.routes.js
// ==========================================
const authRoutes = 
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authService = require('../services/auth.service');
const auditService = require('../services/audit.service');

// Login
router.post('/login', [
  body('username').notEmpty().withMessage('Username es requerido'),
  body('password').notEmpty().withMessage('Password es requerido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const result = await authService.login(username, password);

    // Registrar en auditoría
    await auditService.log({
      user_id: result.user.id,
      action: 'LOGIN',
      entity: 'users',
      entity_id: result.user.id,
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    });

    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Refresh Token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    await authService.logout(token);
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
`;

// ==========================================
// routes/products.routes.js
// ========================================== 
const productRoutes = `
const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const productService = require('../services/product.service');
const inventoryService = require('../services/inventory.service');

// Obtener todos los productos
router.get('/', authenticate, async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20, lowStock } = req.query;
    
    const filters = {
      category,
      search,
      lowStock: lowStock === 'true'
    };
    
    const products = await productService.getAllProducts(filters, page, limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener producto por ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear producto
router.post('/', [
  authenticate,
  authorize('admin'),
  body('code').notEmpty().withMessage('Código es requerido'),
  body('name').notEmpty().withMessage('Nombre es requerido'),
  body('sale_price').isFloat({ min: 0 }).withMessage('Precio de venta inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await productService.createProduct(req.body, req.user.id);
    res.status(201).json(product);
  } catch (error) {
    if (error.message.includes('duplicate')) {
      return res.status(400).json({ message: 'El código del producto ya existe' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Actualizar producto
router.put('/:id', [
  authenticate,
  authorize('admin'),
  param('id').isInt(),
  body('sale_price').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await productService.updateProduct(req.params.id, req.body, req.user.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajustar inventario
router.post('/:id/adjust-stock', [
  authenticate,
  authorize('admin'),
  body('quantity').isInt().withMessage('Cantidad debe ser un número entero'),
  body('reason').notEmpty().withMessage('Razón es requerida')
], async (req, res) => {
  try {
    const { quantity, reason } = req.body;
    const result = await inventoryService.adjustStock(
      req.params.id, 
      quantity, 
      reason, 
      req.user.id
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener productos con stock bajo
router.get('/alerts/low-stock', authenticate, async (req, res) => {
  try {
    const products = await productService.getLowStockProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar producto (soft delete)
router.delete('/:id', [
  authenticate,
  authorize('admin')
], async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id, req.user.id);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
`;

// ==========================================
// routes/sales.routes.js
// ==========================================
const salesRoutes = `
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middlewares/auth.middleware');
const saleService = require('../services/sale.service');
const invoiceService = require('../services/invoice.service');

// Crear venta
router.post('/', [
  authenticate,
  body('items').isArray({ min: 1 }).withMessage('Debe incluir al menos un producto'),
  body('items.*.product_id').isInt().withMessage('ID de producto inválido'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Cantidad inválida'),
  body('payment_method').isIn(['cash', 'card', 'transfer']).withMessage('Método de pago inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const saleData = {
      ...req.body,
      user_id: req.user.id
    };

    const sale = await saleService.createSale(saleData);
    res.status(201).json(sale);
  } catch (error) {
    if (error.message.includes('Stock insuficiente')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las ventas
router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate, status, page = 1, limit = 20 } = req.query;
    
    const filters = {
      startDate,
      endDate,
      status,
      user_id: req.user.role === 'admin' ? null : req.user.id
    };
    
    const sales = await saleService.getAllSales(filters, page, limit);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener venta por ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generar factura PDF
router.get('/:id/invoice', authenticate, async (req, res) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    const pdfBuffer = await invoiceService.generateInvoice(sale);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', \`attachment; filename=factura-\${sale.invoice_number}.pdf\`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Anular venta
router.post('/:id/cancel', authenticate, async (req, res) => {
  try {
    const { reason } = req.body;
    const result = await saleService.cancelSale(req.params.id, reason, req.user.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ventas del día
router.get('/reports/today', authenticate, async (req, res) => {
  try {
    const sales = await saleService.getTodaySales(req.user.id);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
`;

// ==========================================
// routes/purchases.routes.js
// ==========================================
const purchasesRoutes = `
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const purchaseService = require('../services/purchase.service');

// Crear compra
router.post('/', [
  authenticate,
  authorize('admin'),
  body('supplier_id').isInt().withMessage('Proveedor es requerido'),
  body('items').isArray({ min: 1 }).withMessage('Debe incluir al menos un producto'),
  body('items.*.product_id').isInt().withMessage('ID de producto inválido'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Cantidad inválida'),
  body('items.*.unit_price').isFloat({ min: 0 }).withMessage('Precio unitario inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const purchaseData = {
      ...req.body,
      user_id: req.user.id
    };

    const purchase = await purchaseService.createPurchase(purchaseData);
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las compras
router.get('/', authenticate, async (req, res) => {
  try {
    const { supplier_id, startDate, endDate, status, page = 1, limit = 20 } = req.query;
    
    const filters = {
      supplier_id,
      startDate,
      endDate,
      status
    };
    
    const purchases = await purchaseService.getAllPurchases(filters, page, limit);
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener compra por ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const purchase = await purchaseService.getPurchaseById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Confirmar recepción de compra
router.post('/:id/confirm', [
  authenticate,
  authorize('admin')
], async (req, res) => {
  try {
    const result = await purchaseService.confirmPurchase(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
`;

// ==========================================
// routes/cash.routes.js
// ==========================================
const cashRoutes = `
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middlewares/auth.middleware');
const cashService = require('../services/cash.service');

// Abrir caja
router.post('/open', [
  authenticate,
  body('initial_amount').isFloat({ min: 0 }).withMessage('Monto inicial inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cashRegister = await cashService.openCashRegister(
      req.user.id,
      req.body.initial_amount
    );
    res.status(201).json(cashRegister);
  } catch (error) {
    if (error.message.includes('Ya existe una caja abierta')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// Cerrar caja
router.post('/close', [
  authenticate,
  body('actual_amount').isFloat({ min: 0 }).withMessage('Monto final inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await cashService.closeCashRegister(
      req.user.id,
      req.body.actual_amount,
      req.body.notes
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener caja actual
router.get('/current', authenticate, async (req, res) => {
  try {
    const cashRegister = await cashService.getCurrentCashRegister(req.user.id);
    if (!cashRegister) {
      return res.status(404).json({ message: 'No hay caja abierta' });
    }
    res.json(cashRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Registrar movimiento
router.post('/movement', [
  authenticate,
  body('type').isIn(['income', 'expense', 'withdrawal']).withMessage('Tipo de movimiento inválido'),
  body('amount').isFloat({ min: 0 }).withMessage('Monto inválido'),
  body('description').notEmpty().withMessage('Descripción es requerida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const movement = await cashService.registerMovement({
      ...req.body,
      user_id: req.user.id
    });
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener movimientos del día
router.get('/movements/today', authenticate, async (req, res) => {
  try {
    const movements = await cashService.getTodayMovements(req.user.id);
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reporte de caja
router.get('/report/:date', authenticate, async (req, res) => {
  try {
    const report = await cashService.getCashReport(req.params.date, req.user.id);
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
`;

// =============================================
// SERVICES
// =============================================

// ==========================================
// services/auth.service.js
// ==========================================
const authService = `
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

class AuthService {
  async login(username, password) {
    const user = await User.findOne({ where: { username, is_active: true } });
    
    if (!user) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Actualizar último login
    await user.update({ last_login: new Date() });

    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    };
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '8h' }
    );
  }

  generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findByPk(decoded.id);
      
      if (!user || !user.is_active) {
        throw new Error('Usuario no válido');
      }

      const newToken = this.generateToken(user);
      return { token: newToken };
    } catch (error) {
      throw new Error('Refresh token inválido');
    }
  }

  async logout(token) {
    // Aquí podrías agregar el token a una blacklist en Redis
    // Por ahora solo retornamos true
    return true;
  }
}

module.exports = new AuthService();
`;

// ==========================================
// services/inventory.service.js
// ==========================================
const inventoryService = `
const sequelize = require('../config/database');
const Product = require('../models/product.model');
const InventoryMovement = require('../models/inventory.model');
const auditService = require('./audit.service');

class InventoryService {
  async adjustStock(productId, quantity, reason, userId) {
    const transaction = await sequelize.transaction();
    
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      const oldStock = product.current_stock;
      const newStock = oldStock + quantity;

      if (newStock < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      // Actualizar stock
      await product.update({ current_stock: newStock }, { transaction });

      // Registrar movimiento
      await InventoryMovement.create({
        product_id: productId,
        movement_type: quantity > 0 ? 'entrada' : 'salida',
        quantity: Math.abs(quantity),
        reason,
        previous_stock: oldStock,
        new_stock: newStock,
        user_id: userId
      }, { transaction });

      // Auditoría
      await auditService.log({
        user_id: userId,
        action: 'STOCK_ADJUSTMENT',
        entity: 'products',
        entity_id: productId,
        old_values: { stock: oldStock },
        new_values: { stock: newStock }
      }, { transaction });

      await transaction.commit();

      return {
        product_id: productId,
        previous_stock: oldStock,
        new_stock: newStock,
        adjustment: quantity,
        reason
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async checkStockAvailability(productId, requestedQuantity) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return {
      available: product.current_stock >= requestedQuantity,
      current_stock: product.current_stock,
      requested: requestedQuantity,
      shortage: Math.max(0, requestedQuantity - product.current_stock)
    };
  }

  async getStockMovements(productId, startDate, endDate) {
    const where = { product_id: productId };
    
    if (startDate) {
      where.createdAt = { ...where.createdAt, [Op.gte]: startDate };
    }
    
    if (endDate) {
      where.createdAt = { ...where.createdAt, [Op.lte]: endDate };
    }

    return await InventoryMovement.findAll({
      where,
      include: [
        { model: Product, attributes: ['name', 'code'] },
        { model: User, attributes: ['full_name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async getInventoryValuation() {
    const products = await Product.findAll({
      where: { is_active: true },
      attributes: [
        'id',
        'name',
        'code',
        'current_stock',
        'purchase_price',
        'sale_price'
      ]
    });

    const valuation = products.map(product => ({
      ...product.toJSON(),
      cost_value: product.current_stock * product.purchase_price,
      sale_value: product.current_stock * product.sale_price
    }));

    const totals = valuation.reduce((acc, item) => ({
      total_cost: acc.total_cost + item.cost_value,
      total_sale: acc.total_sale + item.sale_value,
      total_items: acc.total_items + item.current_stock
    }), { total_cost: 0, total_sale: 0, total_items: 0 });

    return { products: valuation, totals };
  }
}

module.exports = new InventoryService();
`;

// ==========================================
// services/invoice.service.js
// ==========================================
const invoiceServiceCode = `
const PDFDocument = require('pdfkit');
const moment = require('moment');

class InvoiceService {
  async generateInvoice(sale) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Encabezado
        doc.fontSize(20).text('FARMACIA XYZ', 50, 50, { align: 'center' });
        doc.fontSize(10).text('NIT: 900123456-7', { align: 'center' });
        doc.text('Dirección: Calle 123 #45-67', { align: 'center' });
        doc.text('Tel: (601) 234-5678', { align: 'center' });
        
        doc.moveDown();
        doc.fontSize(16).text(\`FACTURA DE VENTA #\${sale.invoice_number}\`, { align: 'center' });
        
        // Información del cliente
        doc.moveDown();
        doc.fontSize(10);
        doc.text(\`Fecha: \${moment(sale.sale_date).format('DD/MM/YYYY HH:mm')}\`);
        doc.text(\`Cliente: \${sale.customer_name || 'Cliente General'}\`);
        doc.text(\`NIT/CC: \${sale.customer_nit || 'C/F'}\`);
        doc.text(\`Vendedor: \${sale.User?.full_name || 'N/A'}\`);
        
        // Línea separadora
        doc.moveTo(50, doc.y + 10)
           .lineTo(550, doc.y + 10)
           .stroke();
        
        // Tabla de productos
        doc.moveDown();
        const tableTop = doc.y;
        const tableHeaders = ['Producto', 'Cant.', 'P. Unit.', 'Desc.', 'Subtotal'];
        const columnWidths = [200, 60, 80, 80, 80];
        
        // Headers
        let xPosition = 50;
        tableHeaders.forEach((header, i) => {
          doc.text(header, xPosition, tableTop, { width: columnWidths[i], align: 'center' });
          xPosition += columnWidths[i];
        });
        
        // Línea bajo headers
        doc.moveTo(50, tableTop + 20)
           .lineTo(550, tableTop + 20)
           .stroke();
        
        // Detalles
        let yPosition = tableTop + 30;
        sale.SaleDetails?.forEach(detail => {
          xPosition = 50;
          const rowData = [
            detail.Product?.name || 'N/A',
            detail.quantity.toString(),
            \`$\${detail.unit_price.toFixed(2)}\`,
            \`$\${(detail.discount || 0).toFixed(2)}\`,
            \`$\${detail.subtotal.toFixed(2)}\`
          ];
          
          rowData.forEach((data, i) => {
            doc.text(data, xPosition, yPosition, { width: columnWidths[i], align: i === 0 ? 'left' : 'right' });
            xPosition += columnWidths[i];
          });
          
          yPosition += 20;
        });
        
        // Línea separadora
        doc.moveTo(50, yPosition + 10)
           .lineTo(550, yPosition + 10)
           .stroke();
        
        // Totales
        yPosition += 30;
        doc.text(\`Subtotal: $\${sale.subtotal.toFixed(2)}\`, 400, yPosition);
        yPosition += 20;
        doc.text(\`Descuento: $\${(sale.discount || 0).toFixed(2)}\`, 400, yPosition);
        yPosition += 20;
        doc.text(\`IVA (19%): $\${sale.tax.toFixed(2)}\`, 400, yPosition);
        yPosition += 20;
        doc.fontSize(12).text(\`TOTAL: $\${sale.total_amount.toFixed(2)}\`, 400, yPosition);
        
        // Pie de página
        doc.fontSize(8);
        doc.text('Gracias por su compra', 50, 700, { align: 'center' });
        doc.text('Este documento es válido como factura de venta', { align: 'center' });
        
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  generateInvoiceNumber() {
    const prefix = process.env.INVOICE_PREFIX || 'FV';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return \`\${prefix}-\${timestamp}-\${random}\`;
  }
}

module.exports = new InvoiceService();
`;

// =============================================
// UTILS
// =============================================

// ==========================================
// utils/validators.js
// ==========================================
/* const validators = `
const { body, param, query } = require('express-validator');

const validators = {
  // Validadores para productos
  product: {
    create: [
      body('code').notEmpty().trim().isLength({ min: 3, max: 50 }),
      body('name').notEmpty().trim().isLength({ min: 3, max: 200 }),
      body('sale_price').isFloat({ min: 0 }).toFloat(),
      body('purchase_price').optional().isFloat({ min: 0 }).toFloat(),
      body('min_stock').optional().isInt({ min: 0 }).toInt(),
      body('category').optional().trim()
    ],
    update: [
      param('id').isInt().toInt(),
      body('code').optional().trim().isLength({ min: 3, max: 50 }),
      body('name').optional().trim().isLength({ min: 3, max: 200 }),
      body('sale_price').optional().isFloat({ min: 0 }).toFloat(),
      body('purchase_price').optional().isFloat({ min: 0 }).toFloat()
    ]
  },

  // Validadores para ventas
  sale: {
    create: [
      body('items */