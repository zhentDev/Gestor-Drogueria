// config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');
const dotenv = require('dotenv');

// Detecta entorno (default = dev)
const env = process.env.NODE_ENV || 'dev';

// Selecciona archivo .env según el entorno
let envFile;
switch (env) {
  case 'prod':
    envFile = '.env.prod';
    break;
  case 'test':
    envFile = '.env.test';
    break;
  default:
    envFile = '.env.dev';
}

dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

// Construye la URL de base de datos
let databaseUrl;

if (process.env.DATABASE_URL) {
  databaseUrl = process.env.DATABASE_URL;
} else {
  if (env === 'test') {
    // DB en memoria para pruebas unitarias
    databaseUrl = 'sqlite://:memory:';
  } else {
    // Fallback a SQLite local
    databaseUrl = `sqlite:${path.join(__dirname, `../database/pharmacy.${env}.db`)}`;
  }
}

// Inicializa Sequelize
const sequelize = new Sequelize(databaseUrl, {
  logging: env === 'dev' ? console.log : false,
  define: {
    timestamps: true,   // agrega created_at y updated_at
    underscored: true,  // nombres en snake_case
    freezeTableName: true, // evita pluralización automática
  }
});

module.exports = sequelize;
