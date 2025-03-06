const { json } = require('express')
const userService = require('../services/userService')

const getAllUsers = async (request, response) => {
  try {
    const users = await userService.fetchAllUsers()
    response.status(200).json({"data": users })
  }
  catch (error) {
    response.status(500).json({"error": error.message, "details": error})
  }
}


const getUserById = async (request, response) => {
    try {
      const user = await userService.fetchUser(request.id)
      response.status(200).json({"data": user})
    }
    catch (error) {
      response.status(500).json({"error": error.message, "details": error})
    }
}


const createUser = async (request, response) => {
  try {
    const { name, email } = request.body
    const user = await userService.insertUser(name, email)
    response.status(200).json({"data": user})
    
  }
  catch (error) {
    response.status(500).json({"error": error.message, "details": error})
  }
}


const updateUser = async (request, response) => {
    try {
      const { name, email } = request.body
      const user = await userService.updateUser(request.id, name, email)
      response.status(200).json({"data": user})
    }
    catch (error) {
      response.status(500).json({"error": error.message})
    }
}


const removeUser = async (request, response) => {
    try {
      // add middleware validation for if user exists and returns different status if not (404)
      const user = await userService.deleteUser(request.id)
      response.status(204).send()
    }
    catch (error) {
      response.status(500).json({"success": false, "error": error.message, "details": error})
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser,
}