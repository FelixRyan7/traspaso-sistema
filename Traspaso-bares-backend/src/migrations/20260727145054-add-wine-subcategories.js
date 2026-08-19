'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('products', 'subcategory', {
      type: Sequelize.ENUM(
        // Alcohol
        'vodka',
        'gin',
        'rum',
        'whisky',
        'tequila',
        'aperitif',
        'liqueur',

        // Beer
        'beer',

        // Soft drinks
        'water',
        'juice',
        'soda',
        'iced_tea',
        'isotonic',
        'energy_drink',
        'coffee',

        // Wine
        'red',
        'white',
        'rose',
        'sparkling',
        'cava',
        'champagne',

        // Others
        'cleaning',
        'fruit',
        'ice',
        'other'
      ),
      allowNull: false,
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.changeColumn('products', 'subcategory', {
      type: Sequelize.ENUM(
        'vodka',
        'gin',
        'rum',
        'whisky',
        'tequila',
        'aperitif',
        'liqueur',
        'beer',
        'water',
        'juice',
        'soda',
        'iced_tea',
        'isotonic',
        'energy_drink',
        'coffee',
        'cleaning',
        'fruit',
        'ice',
        'other'
      ),
      allowNull: false,
    });

  }
};