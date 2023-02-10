const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}


const errorHandler = (err, request, response, next) => {
  if (err.name === 'ValidationError'){
    response.status(400).json({ error:  err.message })
  } else if (err.name === 'JsonWebTokenError'){
    response.status(400).json({ error: 'token missing or invalid' })
  }

  next(err)
}

module.exports = {
  errorHandler,
  tokenExtractor
}