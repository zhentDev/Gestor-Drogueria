# Sistema de Gestión de Farmacia - v1.0

## 📋 Descripción General

Sistema integral para la gestión de una farmacia que incluye manejo de inventarios, ventas, compras, cajas registradoras, facturación y configuración administrativa. Este documento describe la arquitectura de endpoints y funcionalidades para la implementación del backend y su integración con el frontend.

## 🗺️ Arquitectura de Navegación y Endpoints

### 1. **Inicio** - Dashboard Principal
- **Frontend Route:** `/`
- **Descripción:** Panel de control principal con métricas y resumen del sistema

#### 📡 Backend Endpoints Requeridos:
```
GET /api/auth/active-user
```
- **Propósito:** Obtener información del usuario autenticado
- **Response:**
  ```json
  {
    "id": 1,
    "username": "admin",
    "full_name": "Administrador Principal",
    "email": "admin@farmacia.com",
    "role": "admin",
    "is_active": true,
    "last_login": "2024-01-15T10:30:00Z"
  }
  ```

#### 🎯 Funcionalidades Adicionales Recomendadas:
```
GET /api/dashboard/metrics
```
- **Métricas del día:** ventas totales, productos vendidos, caja actual
- **Alertas:** productos con stock bajo, medicamentos próximos a vencer
- **Gráficos:** ventas del mes, productos más vendidos

---

### 2. **Compras (Recepción)** - Gestión de Pedidos
- **Frontend Route:** `/viewPedidos`
- **Descripción:** Módulo para registrar y gestionar compras a proveedores

#### 📡 Backend Endpoints Requeridos:
```
POST /api/purchases
GET /api/purchases
GET /api/purchases/:id
PUT /api/purchases/:id
DELETE /api/purchases/:id

GET /api/products/search?name={partial_name}
```

#### 📝 Estructura de Datos:
**Purchase (Compra):**
```json
{
  "id": 1,
  "invoice_number": "FC-001",
  "supplier_id": 1,
  "user_id": 1,
  "purchase_date": "2024-01-15",
  "subtotal": 100000,
  "tax": 19000,
  "discount": 0,
  "total": 119000,
  "payment_method": "credito",
  "status": "pendiente",
  "details": [
    {
      "product_id": 1,
      "quantity": 50,
      "unit_price": 2000,
      "subtotal": 100000,
      "expiry_date": "2026-01-15",
      "batch_number": "LOT-001"
    }
  ]
}
```

#### 🎯 Funcionalidades Adicionales:
- Validación de stock mínimo/máximo
- Cálculo automático de precios de venta sugeridos
- Notificaciones de productos próximos a vencer
- Historial de precios por proveedor

---

### 3. **Vender** - Punto de Venta (POS)
- **Frontend Route:** `/viewFacturacionHor`
- **Descripción:** Interfaz de facturación y venta directa

#### 📡 Backend Endpoints Requeridos:
```
POST /api/sales
GET /api/sales
GET /api/sales/:id

GET /api/auth/active-user
GET /api/products/search?name={partial_name}
GET /api/customers/search?document={document_number}
```

#### 📝 Estructura de Datos:
**Sale (Venta):**
```json
{
  "id": 1,
  "invoice_number": "FV-001",
  "customer_id": 1,
  "user_id": 1,
  "cash_register_id": 1,
  "sale_date": "2024-01-15T14:30:00Z",
  "subtotal": 15000,
  "tax": 2850,
  "discount": 1000,
  "total": 16850,
  "payment_method": "efectivo",
  "amount_paid": 20000,
  "change_amount": 3150,
  "status": "completada",
  "details": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": 7500,
      "discount": 500,
      "subtotal": 14500
    }
  ]
}
```

#### 🎯 Funcionalidades Adicionales:
- Validación de prescripción médica para medicamentos controlados
- Aplicación automática de descuentos y promociones
- Integración con lectores de código de barras
- Impresión automática de facturas
- Gestión de devoluciones

---

### 4. **Gestión de Cajas** - Control de Caja Registradora
- **Frontend Route:** `/menuCajas`
- **Descripción:** Administración de cajas registradoras y movimientos de efectivo

#### 📡 Backend Endpoints Requeridos:
```
POST /api/cash-registers          # Abrir caja
PUT /api/cash-registers/:id/close # Cerrar caja
GET /api/cash-registers
GET /api/cash-registers/:id
PUT /api/cash-registers/:id

GET /api/cash-registers/:id/movements
GET /api/cash-registers/:id/sales

POST /api/expenses
GET /api/expenses
```

#### 📝 Estructura de Datos:
**Cash Register:**
```json
{
  "id": 1,
  "user_id": 1,
  "opening_date": "2024-01-15T08:00:00Z",
  "closing_date": null,
  "initial_balance": 50000,
  "final_balance": null,
  "total_sales": 245000,
  "total_expenses": 15000,
  "status": "abierta",
  "notes": "Apertura turno mañana"
}
```

**Expense (Gasto):**
```json
{
  "id": 1,
  "cash_register_id": 1,
  "amount": 5000,
  "description": "Compra de papel para tickets",
  "category": "suministros",
  "date": "2024-01-15T12:00:00Z",
  "user_id": 1
}
```

#### 🎯 Funcionalidades Adicionales:
- Arqueo de caja automático
- Reportes de diferencias en efectivo
- Control de múltiples cajas simultáneas
- Alertas de montos límite

---

### 5. **Inventarios** - Gestión de Stock
- **Frontend Route:** `/viewInventarios`
- **Descripción:** Control completo de inventarios y trazabilidad

#### 📡 Backend Endpoints Requeridos:
```
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

GET /api/suppliers
GET /api/categories

PUT /api/products/bulk-update    # Actualización masiva
GET /api/inventory/movements     # Trazabilidad
GET /api/inventory/low-stock     # Productos con stock bajo
GET /api/inventory/expiring      # Productos próximos a vencer
```

#### 📝 Estructura de Datos:
**Product:**
```json
{
  "id": 1,
  "code": "PRD-PARA-500",
  "name": "Paracetamol 500mg",
  "description": "Analgésico y antipirético",
  "category_id": 1,
  "supplier_id": 1,
  "unit": "unidad",
  "purchase_price": 800,
  "sale_price": 1500,
  "min_stock": 10,
  "current_stock": 45,
  "max_stock": 200,
  "location": "A1-01",
  "requires_prescription": false,
  "is_active": true
}
```

**Inventory Movement:**
```json
{
  "id": 1,
  "product_id": 1,
  "movement_type": "entrada",
  "quantity": 50,
  "reference_type": "purchase",
  "reference_id": 1,
  "notes": "Compra FC-001",
  "date": "2024-01-15T10:00:00Z",
  "user_id": 1
}
```

#### 🎯 Funcionalidades Adicionales:
- Alertas automáticas de stock bajo
- Control de lotes y fechas de vencimiento
- Reportes de rotación de inventario
- Integración con códigos QR/Barcode

---

### 6. **Facturas** - Gestión Documental
- **Frontend Route:** `/viewListFactura`
- **Descripción:** Consulta y gestión de facturas de ventas y compras

#### 📡 Backend Endpoints Requeridos:
```
GET /api/sales?page=1&limit=20&date_from=&date_to=
GET /api/purchases?page=1&limit=20&date_from=&date_to=

PUT /api/sales/:id
DELETE /api/sales/:id
PUT /api/purchases/:id
DELETE /api/purchases/:id

GET /api/sales/:id/pdf           # Generar PDF
GET /api/purchases/:id/pdf
```

#### 🎯 Funcionalidades Adicionales:
- Filtros avanzados (fechas, clientes, proveedores, montos)
- Exportación a Excel/PDF
- Reimpresión de facturas
- Anulación con trazabilidad
- Reportes fiscales (IVA, retenciones)

---

### 7. **Configuración** - Administración del Sistema
- **Frontend Route:** `/confView`
- **Descripción:** Panel administrativo para gestión de usuarios, clientes, proveedores y configuraciones

#### 📡 Backend Endpoints Requeridos:
```
# Usuarios
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id

# Clientes
GET /api/customers
POST /api/customers
PUT /api/customers/:id
DELETE /api/customers/:id

# Proveedores
GET /api/suppliers
POST /api/suppliers
PUT /api/suppliers/:id
DELETE /api/suppliers/:id

# Configuraciones generales
GET /api/settings
PUT /api/settings
```

#### 📝 Estructuras de Datos:
**User:**
```json
{
  "id": 1,
  "username": "vendedor1",
  "password": "hashed_password",
  "full_name": "Juan Vendedor",
  "email": "juan@farmacia.com",
  "role": "vendedor",
  "permissions": ["sales", "inventory_read"],
  "is_active": true,
  "last_login": "2024-01-15T08:30:00Z"
}
```

**Customer:**
```json
{
  "id": 1,
  "document_type": "CC",
  "document_number": "12345678",
  "full_name": "María Cliente",
  "phone": "3001234567",
  "email": "maria@email.com",
  "address": "Calle 123 #45-67",
  "birth_date": "1985-06-15",
  "is_active": true
}
```

---

## 🔐 Consideraciones de Seguridad

### Autenticación y Autorización
- JWT tokens para autenticación
- Roles y permisos granulares
- Middleware de autorización en cada endpoint

### Validaciones
- Validación de esquemas con Joi o similar
- Sanitización de inputs
- Rate limiting para prevenir abuse

## 📊 Estándares de API

### Códigos de Respuesta HTTP
- `200` - Operación exitosa
- `201` - Recurso creado
- `400` - Error de validación
- `401` - No autenticado
- `403` - No autorizado
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

### Formato de Respuestas
```json
{
  "success": true,
  "data": {},
  "message": "Operación completada exitosamente",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Paginación
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

## 🔄 Flujos de Trabajo Recomendados

### Flujo de Venta
1. Buscar productos por nombre/código
2. Validar stock disponible
3. Verificar si requiere prescripción
4. Calcular totales (impuestos, descuentos)
5. Procesar pago
6. Actualizar inventario
7. Registrar movimiento de caja
8. Generar factura

### Flujo de Compra
1. Seleccionar proveedor
2. Agregar productos al pedido
3. Calcular totales
4. Registrar compra
5. Actualizar inventario
6. Registrar movimiento de caja (si es pago inmediato)

## 🚀 Próximas Mejoras (v2.0)

- Integración con APIs de pagos electrónicos
- Sistema de fidelización de clientes
- Reportes avanzados con gráficos
- App móvil para inventarios
- Integración con proveedores (EDI)
- Sistema de alertas por email/SMS

---

**Versión:** 1.0  
**Última actualización:** Enero 2024  
**Desarrollado por:** Equipo de Desarrollo Farmacia