'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('company_products', 'operationalArea', {
      type: Sequelize.ENUM('bar', 'kitchen'),
      allowNull: false,
      defaultValue: 'bar',
      after: 'inventoryUnit',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('company_products', 'operationalArea');
  },
};
