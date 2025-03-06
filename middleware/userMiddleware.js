
const validateUserID = async (request, response, next) => {
  const request_id = parseInt(request.params.id)
  if (isNaN(request_id)) {
    response.status(400).json({"success": false, "error": `validateUserID error, ${request.params.id} is invalid ID: ${request_id}`})
  }
  else {
    request.request_id = request_id
    next()
  }
}

const validateUserSchema = async (request, response, next) => {
  const { name, email } = request.body
  // TODO add validation
  request.name = name
  request.email = email
  next()
}

module.exports = {
    validateUserID,
    validateUserSchema,
}