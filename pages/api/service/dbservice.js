const connection = require("../db");

const insertUrl = async (longUrl) =>
  await new Promise(function (resolve, reject) {
    connection.query(
      "insert into urls (url) values (?);",
      [longUrl],
      (err, result) => {
        if (err) {
          console.log(err);
          UpdateTinyUrl('asdas',1000)
          reject(err);
        } else {
            console.log(result.insertId);
          resolve(result);
        }
      }
    );
  });

const UpdateTinyUrl = async (tinyUrl, id) =>
  await new Promise(function (resolve, reject) {
    console.log("inside dbservice " + id);
    
    connection.query(
      "update urls set shorturl=? where id=?;"[tinyUrl, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
            console.log(result);
          resolve(result);
        }
      }
    );
  });

module.exports = { UpdateTinyUrl, insertUrl };
