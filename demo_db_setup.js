var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlrootpasswordisNEW!"
});

con.connect(function(err) {
  console.log("Func called")
  if (err) throw err;
  console.log("Connected!");
  // need to check if DB is created
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
