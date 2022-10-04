const { pool } = require("../db");
const idtoTinyurl = require("./idtourl");

const insertUrl = async (longUrl) =>
  await new Promise(function (resolve, reject) {
    pool.getConnection((err, connection) => {
      connection.query(
        "insert into urls (url) values (?);",
        [longUrl],
        async (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(result.insertId);
            const updateresult = await UpdateTinyUrl(
              idtoTinyurl(result.insertId),
              result.insertId
            );

            resolve({ result, updateresult });
          }
        }
      );
      connection.release();
    });
  });

const UpdateTinyUrl = async (tinyUrl, id) =>
  await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "update urls set shorturl=? where id=?",
        [tinyUrl, id],
        (err, result) => {
          if (err) reject(result);
          console.log(result);
          resolve(result);
        }
      );
      connection.release();
    });
  });

module.exports = { UpdateTinyUrl, insertUrl };
