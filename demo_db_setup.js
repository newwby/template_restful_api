var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlrootpasswordisNEW!"
});

con.connect(function(err) {
  console.log("Func called")
  if (err) throw err;
  console.log("Connected!")});

// need to check if DB has previously been created
con.query("SHOW DATABASES", function (err, result) {
  if (err) {
    console.error("Error fetching databases:", err);
    return;
  }
  console.log("All Databases:", result);
});

const dbName = 'mydb'; // Ensure this matches your actual database name

con.query("SHOW DATABASES LIKE ?", [dbName], function (err, result) {
  if (err) {
    console.error("Error checking database existence:", err);
    return;
  }
  console.log("Check for database:", result);

  if (result.length > 0) {
    console.log(`Database '${dbName}' exists.`);
    
    // Testing behaviour DO NOT RE-ENABLE
    // con.query("DROP DATABASE mydb", function (err, result) {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log("Database deleted");
    // });

  } else {
    console.log(`Database '${dbName}' does NOT exist.`);
    con.query("CREATE DATABASE mydb", function (err, result) {
      if (err) {
        throw err;
      }
      console.log("Database created");
    });
  }
});