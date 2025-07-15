const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Agent_att = sequelize.define("AgentAtt", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  agent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  checkin_message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  checkout_message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  checkin_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  checkout_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  checkin_location: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  checkout_location: {
    type: DataTypes.JSON,
    allowNull: true,
  }
  
}, {
  tableName: "agent_attendence", 
  timestamps: false
});

module.exports = Agent_att