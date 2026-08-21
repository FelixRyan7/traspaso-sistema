'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'unitType', {
      type: Sequelize.ENUM(
        'can',
        'bottle',
        'jar',
        'pouch',
        'brick',
        'box',
        'bag',
        'roll',
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
        'jar',
        'pouch',
        'brick',
        'box',
        'bag',
        'unit',
        'barrel',
        'bib'
      ),
      allowNull: false,
    });
  },
};
