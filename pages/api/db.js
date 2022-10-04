require('dotenv').config()
const mysql = require('mysql2')
// const connection=mysql.createPool(process.env.DATABASE_URL)
const connection = mysql.createConnection(process.env.DATABASE_URL)

console.log('Connected to PlanetScale!')
// connection.end()
module.exports=connection;










 module.exports=connection;