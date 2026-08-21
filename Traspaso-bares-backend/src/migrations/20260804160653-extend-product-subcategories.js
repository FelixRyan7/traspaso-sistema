'use strict';

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

        // Wine
        'red',
        'white',
        'rose',
        'sparkling',
        'cava',
        'champagne',

        // Beer
        'beer',

        // Soft drinks
        'water',
        'juice',
        'soda',
        'iced_tea',
        'isotonic',
        'energy_drink',

        // Coffee / Starbucks
        'coffee',
        'tea',
        'syrup',
        'sauce',
        'puree',
        'smoothie',
        'cordial',

        // Cocktail
        'mixer',
        'garnish',
        'premix',

        // Food
        'snack',
        'bakery',
        'dessert',
        'fruit',
        'vegetable',
        'meat',
        'fish',
        'dairy',
        'frozen',

        // Supplies
        'cup',
        'lid',
        'straw',
        'napkin',
        'cleaning',
        'cleaning_tool',
        'cloth',
        'gloves',
        'paper',

        // Default
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
        'red',
        'white',
        'rose',
        'sparkling',
        'cava',
        'champagne',
        'beer',
        'water',
        'juice',
        'soda',
        'iced_tea',
        'isotonic',
        'energy_drink',
        'coffee',
        'puree',
        'smoothie',
        'cordial',
        'syrup',
        'mixer',
        'garnish',
        'premix',
        'snack',
        'bakery',
        'dessert',
        'fruit',
        'vegetable',
        'meat',
        'fish',
        'dairy',
        'frozen',
        'other'
      ),
      allowNull: false,
    });
  },
};
