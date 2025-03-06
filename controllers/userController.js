const { json } = require('express')
const queries = require('../services/userService')

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
    try {
      const user = await queries.getUser(request.request_id)
      response.status(200).json({"success": true, "data": user})
    }
    catch (error) {
      response.status(500).json({"success": false, "error": error.message, "details": error})
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


const updateUser = async (request, response) => {
  const {name, email} = request.body
    // TODO add validation
    try {
      const user = await queries.changeUser(request.request_id, name, email)
      response.status(200).json({"success": true, "data": user})
    }
    catch (error) {
      response.status(500).json({"success": false, "error": error.message})
    }
}


const removeUser = async (request, response) => {
    try {
      // add middleware validation for if user exists and returns different status if not (404)
      const user = await queries.deleteUser(request.request_id)
      response.status(204).send()
    }
    catch (error) {
      response.status(500).json({"success": false, "error": error.message, "details": error})
    }
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser,
}