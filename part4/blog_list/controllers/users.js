const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const usersInDb = await User.find({}).populate('blogs')
  response.json(usersInDb)
})

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (password === undefined) {
    return response.status(400).json({ error: "password is missing" }).end()
  }

  if (password.length < 3) {
    return response.status(400).json({ error: "password must be at least three characters long" }).end()
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    passwordHash,
    name
  })

  await newUser.save()

  response.status(201).json(newUser)

})

module.exports = userRouter