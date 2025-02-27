const { json } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    let output = {
      "success": null,
      "status": null,
    }
    if (error) {
      output.success = false
      output.status = 500
      output.error = error
    }
    else {
      output.success = true
      output.status = 200
      output.data = results.rows
    }
    response.status(output.status).json(output)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    let output = {
      "success": null,
      "status": null,
    }
    if (error) {
      output.success = false
      output.status = 500
      output.error = error
    }
    else {
      let is_user_found = (results.rows.length !== 0)
      if (is_user_found) {
        output.success = true
        output.status = 200
        output.id_requested = id
        output.data = results.rows
      }
      else {
        output.success = false
        output.status = 404
        output.id_requested = id
      }
    }
    response.status(output.status).json(output)
  })
}

module.exports = {
    getUsers,
    getUserById,
}