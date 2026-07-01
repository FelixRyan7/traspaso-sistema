const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LocationRequest = sequelize.define(
  "LocationRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true, // temporalmente
    },
     // tipo de movimiento dentro del día
     status: {
      type: DataTypes.ENUM(
        "pending",
        "delivered"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },  
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "location_requests",
    timestamps: true,
     indexes: [
  {
    unique: true,
    fields: ["locationId", "productId", "status", "date"],
  },
]
  }
);

module.exports = LocationRequest;