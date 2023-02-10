const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for (const newUser of testHelper.testUsers) {
    const passwordHash = await bcrypt.hash(newUser.password, 10)

    const newUserObj = new User({ username: newUser.username, name: newUser.name, passwordHash })

    await newUserObj.save()
  }

})


describe('user creation tests', () => {

  test('can add a new valid user', async () => {
    const newUser = { username: "user3", name: "user3 surname", password: "password3" }
    await api.post('/api/users').send(newUser).expect(201)

    const usersInDb = await api.get('/api/users')

    expect(usersInDb.body).toHaveLength(testHelper.testUsers.length + 1)
  })

  test('user with short username fails', async () => {
    const newUser = { username: "ab", name: "I fail", password: "password" }
    await api.post('/api/users').send(newUser).expect(400)

    const usersInDb = await api.get('/api/users')

    expect(usersInDb.body).toHaveLength(testHelper.testUsers.length)
  })

  test('user with short password fails', async () => {
    const newUser = { username: "abel", name: "I fail", password: "rd" }
    await api.post('/api/users').send(newUser).expect(400)

    const usersInDb = await api.get('/api/users')

    expect(usersInDb.body).toHaveLength(testHelper.testUsers.length)
  })
})