const { json } = require('express')
const queries = require('./queries')

const getUsers = async (request, response) => {
  try {
    const users = await queries.getAllUsers()
    response.status(200).json({ "success": true, "data": users })
  }
  catch (error) {
    response.status(500).json({"success": false, "error": error.message, "details": error})
  }
}

/*
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  let output = {
    "status": null,
  }

  // debugger
  if (typeof(id) !== "number") {
    output.status = 400
  }
  else {
    console.log(0)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      console.log(1)
      if (error) {
        console.log(2)
        output.status = 500
        output.error = error
      }
      else {
        console.log(3)
        let is_user_found = (results.rows.length !== 0)
        if (is_user_found) {
          console.log(4)
          output.status = 200
          output.data = results.rows
        }
        else {
          console.log(5)
          output.status = 404
        }
      }
    })
  }
  
  // send response, handling if there's a problem in the error handling
  if (output.status === null) {
    console.log("ERROR IN ERROR HANDLING")
    response.status(0).json(output)
  }
  else {
    response.status(output.status).json(output)
  }
}
*/

module.exports = {
    getUsers,
}