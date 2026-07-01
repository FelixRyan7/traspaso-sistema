const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const User = require('./models/User');

async function seed() {
  try {
    await sequelize.authenticate();

    const adminPassword = await bcrypt.hash('ADMINMARTINIQUE', 10);
    const staffPassword = await bcrypt.hash('STAFFMARTINIQUE', 10);

    const users = [
      {
        name: 'Admin HM Martinique',
        username: 'admin.hm',
        email: null,
        password: adminPassword,
        role: 'admin',
        companyId: 1
      },
      {
        name: 'Staff HM Martinique',
        username: 'staff.hm',
        email: null,
        password: staffPassword,
        role: 'staff',
        companyId: 1
      }
    ];

    for (const user of users) {
      const exists = await User.findOne({
        where: { username: user.username }
      });

      if (!exists) {
        await User.create(user);
        console.log(`Usuario creado: ${user.username}`);
      } else {
        console.log(`Usuario ya existe: ${user.username}`);
      }
    }

    console.log('Seed completado');
    process.exit();
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
}

seed();