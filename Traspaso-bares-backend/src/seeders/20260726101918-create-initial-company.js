'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('companies', [
      {
        id: 1,
        name: 'HM Martinique',
        code: 'HM-MARTINIQUE',
        isActive: true,
        createdAt: new Date('2026-06-08T17:53:42Z'),
        updatedAt: new Date('2026-06-08T17:53:42Z'),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companies', {
      id: 1,
    });
  }
};
