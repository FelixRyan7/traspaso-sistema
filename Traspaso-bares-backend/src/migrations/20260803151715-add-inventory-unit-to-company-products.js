'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('company_products', 'inventoryUnit', {
      type: Sequelize.ENUM('unit', 'kg', 'g', 'l', 'ml'),
      allowNull: true,
      after: 'suggestedQuantity',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'company_products',
      'inventoryUnit'
    );
  },
};
