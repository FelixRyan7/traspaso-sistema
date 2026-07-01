const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

  const LocationProduct = sequelize.define(
    "LocationProduct", 
    {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    priceOverride: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
   {
    tableName: "location_products",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["locationId", "productId"],
      },
    ],
  }
);

module.exports = LocationProduct;