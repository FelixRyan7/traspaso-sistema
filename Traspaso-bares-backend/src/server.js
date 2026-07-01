const app = require('./app');
const sequelize = require('./config/database'); // 👈 IMPORTANTE

require('./models/User');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL exitosa');
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
  }
}

start();

