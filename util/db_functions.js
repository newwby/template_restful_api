// Self contained utility script to handling error checks for DB access
var mysql = require('mysql2');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlrootpasswordisNEW!"
});

// returns every database on the server
function showDatabases() {
    db.query("SHOW DATABASES", function (err, result) {
        if (err) {
        console.error("Error fetching databases:", err);
        return;
        }
        console.log("All Databases:", result);
    });
}

// console logging implemented for testing
function createDatabase(arg_db_name) {
    db.query("SHOW DATABASES LIKE ?", [arg_db_name], function (err, result) {
        if (err) {
        console.error("Error checking database existence:", err);
        return;
        }
        console.log("Check for database:", result);
    
        if (result.length > 0) {
        console.log(`Database '${arg_db_name}' already exists, nothing created.`);
        } else {
        console.log(`Database '${arg_db_name}' does NOT exist.`);
        db.query(`CREATE DATABASE ${arg_db_name}`, function (err, result) {
            if (err) {
            throw err;
            }
            console.log("Database created");
        });
        }
    });
}

module.exports = {showDatabases, createDatabase}