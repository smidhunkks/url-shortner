require("dotenv").config();
const mysql = require("mysql2");
// const connection=mysql.createPool(process.env.DATABASE_URL)
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {"rejectUnauthorized":true},
});
// const connection = mysql.createConnection(process.env.DATABASE_URL)
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("Connected to PlanetScale!");
  connection.release();
  //     connection.query('SELECT * from train', (err, rows) => {
  //         connection.release() // return the connection to pool

  // if (!err) {
  //     console.log(rows)

  // } else {
  //     console.log(err)
  // }

  //         // if(err) throw err
  //         console.log('The data from train table are: \n', rows)
  //     })
});

// connection.end()
module.exports = {  pool };
