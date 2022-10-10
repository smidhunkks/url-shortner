import connection from "../db";
import { checkExistence, getShortUrl } from "../service/dbservice";

// function idtoTinyurl(code) {
//   var base36string = [];
//   var shortenedURL = "";
//   var digit = 0;
//   while (code > 0) {
//     digit = code % 62;
//     base36string.push(digit);
//     code = parseInt(code / 62);
//   }

//   base36string = base36string.reverse();

//   //console.log(base36string);
//   for (let i = 0; i < base36string.length; i++) {
//     if (base36string[i] >= 0 && base36string[i] < 26) {
//       shortenedURL += String.fromCharCode(base36string[i] + 65);
//     } else if (base36string[i] > 25 && base36string[i] < 52) {
//       shortenedURL += String.fromCharCode((base36string[i] % 26) + 97);
//     } else {
//       shortenedURL += String.fromCharCode(base36string[i] - 52 + 48);
//     }
//   }
//   return shortenedURL;
// }

async function handler(req, res) {
  // connection.query('insert into urls (url) values ("hello world")')
  if (req.method === "POST") {
    try {
      const response = await checkExistence(req.body.longUrl);
      // console.log("inside shorten/indexjs");
      // console.log(response);
      if (response.status === 200) {
        const shorturl = await getShortUrl(response.insertId);
        // console.log("shorturl " + shorturl);
        // console.log(shorturl, req.headers.host);
        res.status(200).json({ ...shorturl, host: req.headers.host });
      }
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }
}

export default handler;
