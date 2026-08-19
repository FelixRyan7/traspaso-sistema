const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompanyProduct = sequelize.define(
  'CompanyProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    suggestedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isStockLow: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    inventoryUnit: {
      type: DataTypes.ENUM(
        'unit',
        'kg',
        'g',
        'l',
        'ml'
      ),
      allowNull: true,
    },
    operationalArea: {
      type: DataTypes.ENUM('bar', 'kitchen'),
      allowNull: false,
      defaultValue: 'bar',
    },
  },
  {
    tableName: 'company_products',
    timestamps: true,
  }
);

module.exports = CompanyProduct;