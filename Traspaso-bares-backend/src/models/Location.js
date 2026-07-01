const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define(
  'Location',
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

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM( 'bar', 'kitchen', 'storage', 'restaurant', 'beach_bar', 'rooftop', 'other'),
      allowNull: false,
      defaultValue: 'bar',
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'locations',
    timestamps: true,
  }
);

module.exports = Location;