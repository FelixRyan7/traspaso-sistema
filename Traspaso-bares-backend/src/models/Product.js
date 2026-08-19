const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // Nombre comercial
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Categoria general
    category: {
      type: DataTypes.ENUM(
        'alcohol',
        'soft_drink',
        'beer',
        'wine',
        'food',
        'cocktail',
        'supplies',
        'other'
      ),
      allowNull: false,
    },

    // Subcategoria concreta
    subcategory: {
      type: DataTypes.ENUM(
        'vodka',
        'gin',
        'rum',
        'whisky',
        'tequila',
        'brandy',
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
        'cleaning',
        'fruit',
        'snack',
        'ice',
        'tea',
        'sauce',
        'cup',
        'lid',
        'straw',
        'napkin',
        'cleaning',
        'cleaning_tool',
        'cloth',
        'gloves',
        'paper',
        'other'
      ),
      allowNull: false,
    },

    // Tipo de envase / formato
    unitType: {
      type: DataTypes.ENUM(
        'can',
        'bottle',
        'box',
        'bag',
        'unit',
        'barrel',
        'jar',
        'pouch',
        'bib',
        'brick',
        'roll'
      ), 

      allowNull: false,
    },

    // Cantidad numerica
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    // Unidad de medida
    quantityUnit: {
      type: DataTypes.ENUM(
        'ml',
        'l',
        'g',
        'kg',
        'unit'
      ),
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isStandardCatalog: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    defaultSuggestedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: 'products',
    timestamps: true,
  }
);

module.exports = Product;