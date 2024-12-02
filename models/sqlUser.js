const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SQLUser = sequelize.define("SQLUser", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  estadoCredencial: { type: DataTypes.STRING, defaultValue: "Activo" },
  cargo: { type: DataTypes.STRING, defaultValue: "Sin definir" },
});

module.exports = SQLUser;
