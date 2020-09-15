// to generate this file run below command at root folder
// $ knex init

require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: path.join(__dirname, "knex", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "knex", "seeds"),
    },
  },
};
