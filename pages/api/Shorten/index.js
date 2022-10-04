import connection from "../db";
import {  UpdateTinyUrl, insertUrl } from "../service/dbservice";

function idtoTinyurl(code) {
  var base36string = [];
  var shortenedURL = "";
  var digit = 0;
  while (code > 0) {
    digit = code % 62;
    base36string.push(digit);
    code = parseInt(code / 62);
  }

  base36string = base36string.reverse();

  //console.log(base36string);
  for (let i = 0; i < base36string.length; i++) {
    if (base36string[i] >= 0 && base36string[i] < 26) {
      shortenedURL += String.fromCharCode(base36string[i] + 65);
    } else if (base36string[i] > 25 && base36string[i] < 52) {
      shortenedURL += String.fromCharCode((base36string[i] % 26) + 97);
    } else {
      shortenedURL += String.fromCharCode(base36string[i] - 52 + 48);
    }
  }
  return shortenedURL;
}

async function handler(req, res) {
  // connection.query('insert into urls (url) values ("hello world")')
  if (req.method === "POST") {
    try {
     
      const response = await insertUrl(req.body.longUrl);

      const tinyUrl =await idtoTinyurl(response.insertId);
     // console.log(tinyUrl, response.insertId);

      const updateresponse = await  UpdateTinyUrl(tinyUrl, response.insertId);
      console.log("updated response : " + updateresponse);

      res.status(201).json(response);
    } catch (error) {
      res.status(error.status);
    }
    // insertUrl(req.body.longUrl)
    //   .then((response) => {
    //     //console.log(response);

    //     res.status(201).json(response);

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(err.code);
    //   });
  }
}

export default handler;
