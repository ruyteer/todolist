const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Task = db.define("Task", {
  task: {
    type: DataTypes.STRING,
    require: true,
  },
});

module.exports = Task;
