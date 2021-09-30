const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "",
  password: "",
  database: "agenda-petshop",
});

module.exports = connection;
