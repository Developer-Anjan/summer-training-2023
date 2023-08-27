const Mysqli = require("mysqli");
var connection = new Mysqli({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  passwd: process.env.DB_PASSWORD,
  db: process.env.DB_NAME,
});

const database = connection.emit();

module.exports = database;
