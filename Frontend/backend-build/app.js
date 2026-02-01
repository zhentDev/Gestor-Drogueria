const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const NODE_ENV = process.env.NODE_ENV || "development"; // para acceder a rutas development.

require("dotenv-flow").config();

// console.log(`Entorno: ${NODE_ENV}`);
console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);

const app = express();
// Middlewares de seguridad
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
  })
);
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests
});
app.use("/api/", limiter);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  const devRouter = require("./routes/dev");
  app.use("/__dev", devRouter);
}

app.use("/api/auth", require("./routes/auth.routes")); //app.use('/api/users', require('./routes/users.routes'));
app.use("/api/users", require("./routes/user.routes"));

// Routes
/* 
app.use('/api/products', require('./routes/products.routes')); 
app.use('/api/purchases', require('./routes/purchases.routes'));
app.use('/api/sales', require('./routes/sales.routes'));
app.use('/api/cash', require('./routes/cash.routes'));
app.use('/api/reports', require('./routes/reports.routes')); */

// Error handling middleware
app.use(require("./middlewares/notFound.middleware")); // 404 handler
app.use(require("./middlewares/error.middleware"));

module.exports = app;
