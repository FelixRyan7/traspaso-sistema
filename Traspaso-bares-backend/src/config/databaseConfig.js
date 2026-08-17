require('dotenv').config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',

  logging: process.env.NODE_ENV !== 'development',

  timezone: '+00:00',

  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};