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

    // Categoria general
    category: {
      type: DataTypes.ENUM(
        'alcohol',
        'soft_drink',
        'beer',
        'wine',
        'food',
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
        'aperitif',
        'liqueur',
        'beer',
        'water',
        'juice',
        'soda',
        'energy_drink',
        'coffee',
        'cleaning',
        'fruit',
        'ice',
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
        'barril',
        'bib'
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
  },
  {
    tableName: 'products',
    timestamps: true,
  }
);

module.exports = Product;