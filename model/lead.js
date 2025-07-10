const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lead = sequelize.define("Lead", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    type: DataTypes.STRING,
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assigned: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date_contacted: {
    type: DataTypes.DATE,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    onUpdate: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: "lms_leads",
  timestamps: false
});

module.exports = Lead;

