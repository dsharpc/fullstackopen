const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  } else {
    response.status(401).json({ error: 'token is missing from request' })
  }
  next()
}

const userExtractor = (request, response, next) => {
  const decodedUser = jwt.verify(request.token, process.env.SECRET)

  if (!decodedUser.id) {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  request.user = decodedUser

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
  tokenExtractor,
  userExtractor
}