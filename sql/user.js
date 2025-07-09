const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  email_verified_at: { type: DataTypes.DATE, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  remember_token: { type: DataTypes.STRING(100), allowNull: true },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: true },
  phone_number: { type: DataTypes.STRING, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  otp: { type: DataTypes.STRING, allowNull: true },
  otp_expires_at: { type: DataTypes.DATE, allowNull: true }
},{
    tableName: "users",
    timestamps: false
});

module.exports = User;
