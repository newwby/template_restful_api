const validateUserID = async (request, response, next) => {
  const request_id = parseInt(request.params.id)
  if (isNaN(request_id)) {
    response.status(400).json({"error": `Could not validate user id ${request_id}.`, "status": 400})
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