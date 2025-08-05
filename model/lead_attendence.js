const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lead_att = sequelize.define("LeadAtt", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lead_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  check_in_photo: {
    type: DataTypes.BLOB('long')
  },
  check_out_photo: {
    type: DataTypes.BLOB('long')
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
  tableName: "lead_attendence", 
  timestamps: false
});

module.exports = Lead_att
