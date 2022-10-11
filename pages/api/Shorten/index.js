import connection from "../db";
import { checkExistence, getShortUrl } from "../service/dbservice";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await checkExistence(req.body.longUrl);

      if (response.status === 200) {
        const shorturl = await getShortUrl(response.insertId);

        res.status(200).json({ ...shorturl, host: req.headers.host });
      }
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }
}

export default handler;
