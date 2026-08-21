'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('products', 'unitType', {
      type: Sequelize.ENUM(
        'can',
        'bottle',
        'jar',
        'pouch',
        'box',
        'bag',
        'unit',
        'barrel',
        'bib'
      ),
      allowNull: false,
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.changeColumn('products', 'unitType', {
      type: Sequelize.ENUM(
        'can',
        'bottle',
        'box',
        'bag',
        'unit',
        'barrel',
        'bib'
      ),
      allowNull: false,
    });

  }
};
