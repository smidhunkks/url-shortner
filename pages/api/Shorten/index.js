import connection from "../db";

  function handler (req, res) {
  connection.query('select * from urls;',(err,result)=>{
    console.log(result);
  });
 

  // connection.query('insert into urls (url) values ("hello world")')
  res.status(200).json({ name: "Home" });
}

export default handler;
