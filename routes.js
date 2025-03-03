const { json } = require('express')
const queries = require('./queries')

const getUsers = async (request, response) => {
  try {
    const users = await queries.getAllUsers()
    response.status(200).json({"success": true, "data": users })
  }
  catch (error) {
    response.status(500).json({"success": false, "error": error.message, "details": error})
  }
}


const getUserById = async (request, response) => {
  const request_id = parseInt(request.params.id)
  if (isNaN(request_id)) {
    response.status(400).json({"success": false, "error": `getUserById error, ${request.params.id} is invalid ID: ${request_id}`})
  }
  else {
    try {
      const user = await queries.getUser(request_id)
      response.status(200).json({"success": true, "data": user})
    }
    catch (error) {
      response.status(500).json({"success": false, "error": error.message, "details": error})
    }
  }
}

const createUser = async (request, response) => {
  const { name, email } = request.body
  // TODO add validation
  try {
    const user = await queries.addUser(name, email)
    response.status(200).json({"success": true, "data": user})
    
  }
  catch (error) {
    response.status(500).json({"success": false, "error": error.message, "details": error})
  }
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
}