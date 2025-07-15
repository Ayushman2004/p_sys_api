const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Agent = sequelize.define("Agent", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  agent_password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  agent_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  last_login: {
    type: DataTypes.DATE,
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
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    onUpdate: sequelize.literal("CURRENT_TIMESTAMP") //check later during dev
  }
}, {
  tableName: "lms_agents",  
  timestamps: false
});

module.exports = Agent;
