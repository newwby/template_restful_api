

const validateUserID = async (request, response, next) => {
  const request_id = parseInt(request.params.id)
  if (isNaN(request_id)) {
    response.status(400).json({"error": `validateUserID error, ${request.params.id} is invalid ID: ${request_id}`})
  }
  else {
    request.id = request_id
    next()
  }
}

const validateUserSchema = async (request, response, next) => {
//   add error if request.body doesn't include schema requirements
    const { name, email } = request.body
  // TODO add validation
//   request.name = name
//   request.email = email
  next()
}

module.exports = {
    validateUserID,
    validateUserSchema,
}