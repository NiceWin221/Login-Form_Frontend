const Sequelize = require("sequelize");

const db = new Sequelize("myDB", "root", "Edsrcwmysql5", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
