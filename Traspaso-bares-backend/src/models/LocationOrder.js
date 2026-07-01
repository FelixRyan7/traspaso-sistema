const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LocationOrder = sequelize.define(
  "LocationOrder",
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

    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    targetDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

  },
  {
    tableName: "location_orders",
    timestamps: true,
  }
);

module.exports = LocationOrder;