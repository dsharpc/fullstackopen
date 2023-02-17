const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/users')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing', testingRouter)

app.use(middleware.errorHandler)

module.exports = app