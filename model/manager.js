const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Manager = sequelize.define("Manager", {
  id: { 
    type: DataTypes.BIGINT.UNSIGNED, 
    autoIncrement: true, 
    primaryKey: true 
},
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
},
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  created_at: { 
    type: DataTypes.DATE, 
    allowNull: true 
},
  phone_number: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
  gender: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
},{
    tableName: "manager",
    timestamps: false
});

module.exports = Manager;