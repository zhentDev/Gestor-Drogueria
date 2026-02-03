
const { body, param } = require('express-validator');

const createSaleValidation = [
  body('customer_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de cliente inválido'),
  
  body('cash_register_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de caja registradora inválido'),
  
  body('sale_date')
    .optional()
    .isISO8601()
    .withMessage('Fecha de venta inválida'),
  
  body('subtotal')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El subtotal debe ser un número positivo'),
  
  body('tax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El impuesto debe ser un número positivo'),
  
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El descuento debe ser un número positivo'),
  
  body('total')
    .notEmpty()
    .withMessage('El total es requerido')
    .isFloat({ min: 0 })
    .withMessage('El total debe ser un número positivo'),
  
  body('payment_method')
    .optional()
    .isIn(['efectivo', 'tarjeta', 'transferencia', 'mixto'])
    .withMessage('Método de pago inválido'),
  
  body('amount_paid')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El monto pagado debe ser un número positivo'),
  
  body('change_amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El cambio debe ser un número positivo'),
  
  body('status')
    .optional()
    .isIn(['pendiente', 'completada', 'cancelada'])
    .withMessage('El estado debe ser pendiente, completada o cancelada'),
  
  body('notes')
    .optional()
    .isString()
    .withMessage('Las notas deben ser texto')
];

const updateSaleValidation = [
  body('customer_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de cliente inválido'),
  
  body('cash_register_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de caja registradora inválido'),
  
  body('sale_date')
    .optional()
    .isISO8601()
    .withMessage('Fecha de venta inválida'),
  
  body('subtotal')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El subtotal debe ser un número positivo'),
  
  body('tax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El impuesto debe ser un número positivo'),
  
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El descuento debe ser un número positivo'),
  
  body('total')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El total debe ser un número positivo'),
  
  body('payment_method')
    .optional()
    .isIn(['efectivo', 'tarjeta', 'transferencia', 'mixto'])
    .withMessage('Método de pago inválido'),
  
  body('amount_paid')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El monto pagado debe ser un número positivo'),
  
  body('change_amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El cambio debe ser un número positivo'),
  
  body('status')
    .optional()
    .isIn(['pendiente', 'completada', 'cancelada'])
    .withMessage('El estado debe ser pendiente, completada o cancelada'),
  
  body('notes')
    .optional()
    .isString()
    .withMessage('Las notas deben ser texto')
];

const completeSaleValidation = [
  body('customer_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de cliente inválido'),
  
  body('cash_register_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('ID de caja registradora inválido'),
  
  body('payment_method')
    .notEmpty()
    .withMessage('El método de pago es requerido')
    .isIn(['efectivo', 'tarjeta', 'transferencia', 'mixto'])
    .withMessage('Método de pago inválido'),
  
  body('amount_paid')
    .notEmpty()
    .withMessage('El monto pagado es requerido')
    .isFloat({ min: 0 })
    .withMessage('El monto pagado debe ser un número positivo'),
  
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El descuento debe ser un número positivo'),
  
  body('tax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El impuesto debe ser un número positivo'),
  
  body('details')
    .notEmpty()
    .withMessage('Los detalles de la venta son requeridos')
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un producto'),
  
  body('details.*.product_id')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de producto inválido'),
  
  body('details.*.product_presentation_id')
    .notEmpty()
    .withMessage('El ID de presentación es requerido')
    .isInt({ min: 1 })
    .withMessage('ID de presentación inválido'),
  
  body('details.*.quantity')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
  
  body('details.*.unit_price')
    .notEmpty()
    .withMessage('El precio unitario es requerido')
    .isFloat({ min: 0 })
    .withMessage('El precio unitario debe ser un número positivo'),
  
  body('details.*.discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El descuento debe ser un número positivo'),
  
  body('notes')
    .optional()
    .isString()
    .withMessage('Las notas deben ser texto')
];

const idParamValidation = [
  param('customerId')
    .isInt({ min: 1 })
    .withMessage('ID inválido')
];

module.exports = {
  createSaleValidation,
  updateSaleValidation,
  completeSaleValidation,
  idParamValidation
};