const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  agent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  agent_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  notification_for: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  read: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: "lms_notification", // use your actual table name here
  timestamps: false
});

module.exports = Notification;
