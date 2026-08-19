'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Super Admin',
        username: 'superAdmin',
        email: 'admin@hm.com',
        password: '$2b$10$dJNyon8Lr2nURTZraf1TUuP/zvI9rB3/tj7BRLbzKeRVd6uoei4/2',
        role: 'superadmin',
        companyId: null,
        createdAt: new Date('2026-06-08T18:03:31Z'),
        updatedAt: new Date('2026-06-08T18:03:31Z'),
      },
      {
        id: 2,
        name: 'Manager',
        username: 'manager',
        email: 'manager1@hotel.com',
        password: '$2b$10$zZhX9xQ2J1yRex5/j4PGcedMZjjZY1vtEOS00jkaioWsJ5qV3Puqi',
        role: 'manager',
        companyId: 1,
        createdAt: new Date('2026-06-10T11:30:05Z'),
        updatedAt: new Date('2026-06-10T11:30:05Z'),
      },
      {
        id: 3,
        name: 'Staff',
        username: 'staff',
        email: 'staff@hm.com',
        password: '$2b$10$EBdvGmW6UIHliODSJaStvOVICrfrunapLI6Tw7rn7R38TDyIyluOW',
        role: 'staff',
        companyId: 1,
        createdAt: new Date('2026-06-08T18:03:31Z'),
        updatedAt: new Date('2026-06-08T18:03:31Z'),
      },
      {
        id: 4,
        name: 'Admin',
        username: 'admin',
        email: 'admin@hm.com',
        password: '$2b$10$AodGuo17mKnk3yKPsBaT4u8n93ABjFBY5aUSHvajqo5k17vsW7YM.',
        role: 'admin',
        companyId: 1,
        createdAt: new Date('2026-06-08T18:03:31Z'),
        updatedAt: new Date('2026-06-08T18:03:31Z'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', {
    username: {
      [Sequelize.Op.in]: ['superAdmin', 'admin', 'manager', 'staff'],
    },
  });
}
};
