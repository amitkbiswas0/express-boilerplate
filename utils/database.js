require("dotenv").config();
const { Pool } = require("pg");

const { HOST, DB_USER, DB_NAME, DB_PASS, DB_PORT } = process.env;

const pool = new Pool({
  host: HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
