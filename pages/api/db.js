require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { "rejectUnauthorized": true },
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("Connected to PlanetScale!");
  connection.release();
});

module.exports = { pool };
