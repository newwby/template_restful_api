
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

module.exports = {
    validateUserID,
}