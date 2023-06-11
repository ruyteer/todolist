const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("todolist", "root", "Ruyter99.", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
