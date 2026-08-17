'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('locations', [
      {
        id: 1,
        companyId: 1,
        name: 'Chamizo',
        type: 'bar',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        companyId: 1,
        name: 'Cantina',
        type: 'bar',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        companyId: 1,
        name: 'Bar Salon',
        type: 'bar',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        companyId: 1,
        name: 'Sky Bar',
        type: 'bar',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('locations', {
      companyId: 1,
    });
  },
};