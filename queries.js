
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


async function getUser(arg_id) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM users WHERE id = ${arg_id}`, (error, results) => {
      if (error) {
        console.error(`getUser error: ${error}`)
        error.message = `Failed to get user ${arg_id}: ${error.message}`
        return reject(error)
      }
      else if (results.rows.length === 0) {
        return reject (new Error(`getUser - user ${arg_id} not found.`))
      }
      else {
        resolve(results.rows)
      }
    })
  })
}


async function addUser(arg_name, arg_email) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [arg_name, arg_email], (error, results) => {
      // error handling
      if (error) {
        console.error(`addUser error: ${error}`)
        error.message = `Failed to add user with info ${arg_name}, ${arg_email}: ${error.message}`
        return reject(error)
      }
      else if (results.rows.length === 0) {
        return reject (new Error(`addUser - new user with info ${arg_name}, ${arg_email} not returned.`))
      }
      else {
        resolve(results.rows)
      }

    })
  })
}



// need to adjust queries/userService function names, add consistency for whether constants/functions
async function changeUser(arg_id, arg_name, arg_email) {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [arg_name, arg_email, arg_id],
    (error, results) => {
      // error handling
      if (error) {
        console.error(`changeUser error: ${error}`)
        error.message = `Failed to modify user id ${arg_id} with info ${arg_name}, ${arg_email}. Error: ${error}`
        return reject(error)
      }
      else {
        resolve(results.rows)
      }

    })
  })
}


async function deleteUser(arg_id) {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = $1', [arg_id], (error, results) => {
      if (error) {
        console.error(`getUser error: ${error}`)
        error.message = `Failed to get user ${arg_id}: ${error.message}`
        return reject(error)
      }
      else {
        resolve()
      }
    })
  })
}


module.exports = {
  getAllUsers,
  getUser,
  addUser,
  changeUser,
  deleteUser,
}