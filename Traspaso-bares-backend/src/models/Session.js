const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define("Session", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  refreshToken: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  suspicious: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  }
  
},
{
  tableName: 'sessions',
  timestamps: true,
}
);

module.exports = Session;
