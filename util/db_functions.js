// Self contained utility script to handling error checks for DB access

module.exports = {
    showDatabases,
    createDatabase,
    // createTable
}

// always run
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
            console.error("showDatabases error"+` (${err})`);
            return;
        }
        console.log("All Databases:", result);
    });
}

// TODO - convert to connectionPool before attempting to utilise this, else race condition
// type validates argument and returns if database exists
// function hasDatabase(arg_db_name) {
//     debugger
//     if (typeof(arg_db_name) != "string") {
//         console.error("hasDatabase error"+` (${arg_db_name}) is not string.`);
//         return null
//     } 
//     else {
//         console.log("starting")
//         db.query("SHOW DATABASES LIKE ?", [arg_db_name], function (err, result) {
//             console.log("reached inside query")
//             if (err) {
//                 console.error("hasDatabase error"+` (${err})`);
//                 return;
//             }
//             else {
//                 console.log(`output is ${result.length > 0}`)
//                 return (result.length > 0)
//             }
//         })
//     }
//     // catchall
//     console.log("using catchall escape")
//     return null
// }

// console logging implemented for testing
function createDatabase(arg_db_name) {
    if (typeof(arg_db_name) != "string") {
        console.error("createDatabase error"+` (${arg_db_name}) is not string.`);
        return;
    }
    db.query("SHOW DATABASES LIKE ?", [arg_db_name], function (err, result) {
        if (err) {
            console.error("createDatabase error"+` (${err})`);
            return;
        }
        
        // DB exists
        else if (result.length > 0) {
            // do nothing
        
        // DB does not exist
        } else {
            db.query(`CREATE DATABASE ${arg_db_name}`, function (err, result) {
                if (err) {
                    console.log("create db marker")
                    console.error("createDatabase error"+` (${err})`);
                    return;
                }
                else {
                    console.log(`result is ${JSON.stringify(result)}`)
                }
            })
        }
    })
}

/*
function createTable() {
    db.query("", function(err, result) {
        if (err) {
            console.error("createTable error"+` (${err})`);
            return;
        }
        else {
            console.error("Error 2 on calling createTable: "+`${err}`);
            return;
        }
    })

}
*/