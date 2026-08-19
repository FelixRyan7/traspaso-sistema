require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database'); // 👈 IMPORTANTE


const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL exitosa');

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
  }
}

start();

