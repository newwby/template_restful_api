
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        console.error(`getAllUsers error: ${error}`)
        error.message = `Failed to get all users: ${error.message}`
        return reject(error)
      }
      else if (!results.rows) {
        return reject (new Error('getAllUsers output error.'))
      }
      else if (results.rows.length === 0) {
        return reject (new Error('getAllUsers - no users found.'))
      }
      else {
        resolve(results.rows)
      }
    });
  })
}


module.exports = {
  getAllUsers,
}