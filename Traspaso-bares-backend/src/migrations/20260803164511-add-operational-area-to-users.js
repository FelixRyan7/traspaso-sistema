'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'operationalArea', {
      type: Sequelize.ENUM('bar', 'kitchen'),
      allowNull: true,
      after: 'role',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'operationalArea');
  },
};
