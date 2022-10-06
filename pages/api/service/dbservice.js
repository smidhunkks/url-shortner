const { pool } = require("../db");
const idtoTinyurl = require("./idtourl");

const checkExistence = async (longUrl) =>
  await new Promise((resolve, reject) => {
    pool.getConnection((err, dbconnection) => {
      if (err) throw err;
      dbconnection.query(
        "select * from urls where url=?",
        [longUrl],
        async (err, result) => {
          if (err) reject(err);
          if (result.length > 0)
            resolve({
              status: 200,
              insertId: result[0].id,
            });
          else {
            const insertResponse = await insertUrl(longUrl);
            console.log("below insert response", insertResponse);

            // const shorturl = await getShortUrl(insertResponse.insertId);
            // console.log("inside check existence");
            // console.log(shorturl);
            resolve(insertResponse);
          }
        }
      );
    });
  });

const insertUrl = async (longUrl) => {
  // const check=await checkExistence(longUrl)
  // console.log(check);
  return await new Promise(function (resolve, reject) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "insert into urls (url) values (?);",
        [longUrl],
        async (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const updateresult = await UpdateTinyUrl(
              idtoTinyurl(result.insertId),
              result.insertId
            );
            if (updateresult.serverStatus === 2 && result.serverStatus === 2)
              resolve({ status: 200, ...result });
            else reject({ status: 401, ...result });
          }
        }
      );
      connection.release();
    });
  });
};

const UpdateTinyUrl = async (tinyUrl, id) =>
  await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "update urls set shorturl=? where id=?",
        [tinyUrl, id],
        (err, result) => {
          if (err) reject(err);
          console.log(result);
          resolve({ status: 200, ...result });
        }
      );
      connection.release();
    });
  });

const getLongUrl = async (shortUrl) =>
  await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "select * from urls where shorturl=?",
        [shortUrl],
        (err, result) => {
          if (err) reject(err);
          console.log(result);
          resolve({ status: 200, ...result });
        }
      );
      connection.release();
    });
  });

const getShortUrl = 
// async (id) =>
// await new Promise((resolve, reject) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       "select * from urls where id=?",
//       [id],
//       (err, result) => {
//         if (err) reject(err);
//         console.log(result);
//         resolve({ status: 200, ...result[0] });
//       }
//     );
//     connection.release();
//   });
// });

async (id) => {
 return await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("select * from urls where id=?", [id], (err, result) => {
        if (err) reject(err);
        // console.log("inside getshorturl " + result);
        // console.log(result);
        if (result.length > 0) resolve({ status: 200, ...result[0] });
        else {
          reject({ status: 404, message: "Url not found" });
        }
      });
     // connection.release();
    });
  });
};

module.exports = { checkExistence, getLongUrl, getShortUrl };
