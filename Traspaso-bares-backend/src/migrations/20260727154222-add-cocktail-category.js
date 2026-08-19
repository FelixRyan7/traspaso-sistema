'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Actualizar category
    await queryInterface.changeColumn('products', 'category', {
      type: Sequelize.ENUM(
        'alcohol',
        'beer',
        'wine',
        'soft_drink',
        'cocktail',
        'food',
        'supplies',
        'other'
      ),
      allowNull: false,
    });

    // Actualizar subcategory
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

        // Cocktail
        'puree',
        'syrup',
        'mixer',
        'garnish',
        'premix',

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

    // Restaurar category
    await queryInterface.changeColumn('products', 'category', {
      type: Sequelize.ENUM(
        'alcohol',
        'beer',
        'wine',
        'soft_drink',
        'food',
        'supplies',
        'other'
      ),
      allowNull: false,
    });

    // Restaurar subcategory
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

  }
};
