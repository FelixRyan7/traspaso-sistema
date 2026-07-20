const sequelize = require('../config/database');


const health = async (req, res) => {
  try {
    await sequelize.authenticate();

    return res.status(200).json({
      status: "ok",
      database: "connected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(503).json({
      status: "error",
      database: "disconnected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = { health };