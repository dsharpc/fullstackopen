
const errorHandler = (err, request, response, next) => {
  if (err.name === 'ValidationError'){
    response.status(400).json({ error:  err.message })
  }

  next(err)
}

module.exports = {
  errorHandler
}