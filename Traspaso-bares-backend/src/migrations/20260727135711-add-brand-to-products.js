'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('products', 'brand', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'name', // Solo funciona en MySQL
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('products', 'brand');

  }
};
