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
        'brandy',
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
        'smoothie',
        'syrup',
        'cordial',
        'mixer',
        'premix',
        'garnish',

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
        'smoothie',
        'syrup',
        'cordial',
        'mixer',
        'premix',
        'garnish',

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
