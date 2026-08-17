'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Indica si el producto forma parte del catálogo estándar
    await queryInterface.addColumn('products', 'isStandardCatalog', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    // Cantidad sugerida inicial al asignar el producto a una empresa
    await queryInterface.addColumn('products', 'defaultSuggestedQuantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn(
      'products',
      'defaultSuggestedQuantity'
    );

    await queryInterface.removeColumn(
      'products',
      'isStandardCatalog'
    );

  }
};
