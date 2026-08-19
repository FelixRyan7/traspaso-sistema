const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('superadmin', 'admin', 'manager', 'staff'),
    allowNull: false,
    defaultValue: 'staff'
  },
  operationalArea: {
    type: DataTypes.ENUM('bar', 'kitchen'),
    allowNull: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
  },
  {
    tableName: 'users',
    timestamps: true,
  });

module.exports = User;