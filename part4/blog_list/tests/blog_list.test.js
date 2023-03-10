const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper')

const api = supertest(app)

const mock = {}

beforeAll(async () => {
  await User.findOneAndRemove({ username: "testuser" })
  const newUser = new User({ username: "testuser", name: "test user", password: "testpass" })
  await newUser.save()

  const token = jwt.sign({ username: newUser.username, id: newUser._id }, process.env.SECRET)

  mock.authenticatedApi = new Proxy(api, {
    get: (target, name) => (...args) =>
      (target)[name](...args).set({
        'Authorization': `Bearer ${token}`
      }),
  })

  mock.testUser = newUser
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = testHelper.testBlogs.map(blog => new Blog(blog))
  const blogPromises = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromises)

})

test('returns the correct amount of blogs', async () => {
  const blogsInDb = await mock.authenticatedApi.get('/api/blogs')

  expect(blogsInDb.body).toHaveLength(testHelper.testBlogs.length)

})

test('the unique identifier for a blog is id', async () => {
  const blogsInDb = await mock.authenticatedApi.get('/api/blogs')

  const exampleBlog = blogsInDb.body[0]

  expect(exampleBlog.id).toBeDefined()
})

test('post request creates a new blog', async () => {
  const blogToAdd = { title: "test", author:"test", url: "test.com", likes: 5 }
  await mock.authenticatedApi.post('/api/blogs').send( blogToAdd )

  const blogsInDb = await mock.authenticatedApi.get('/api/blogs')

  expect(blogsInDb.body).toHaveLength(testHelper.testBlogs.length + 1)
  expect(blogsInDb.body.map(blog => blog.title)).toContainEqual(blogToAdd.title)
})

test('missing likes defaults to zero', async () => {
  const blogToAdd = { title: "test", author:"test", url: "test.com" }
  await mock.authenticatedApi.post('/api/blogs').send( blogToAdd )

  const blogsInDb = await mock.authenticatedApi.get('/api/blogs')

  const justAddedBlog = blogsInDb.body.find(blog => blog.title === blogToAdd.title)
  expect(justAddedBlog.likes).toBe(0)

})

test('missing title raises 400 error', async () => {
  const missingTitle = { author: "test", url: "test" }
  await mock.authenticatedApi.post('/api/blogs').send(missingTitle).expect(400)
})

test('missing url raises 400 error', async () => {
  const missingUrl = { author: "test", title: "test" }
  await mock.authenticatedApi.post('/api/blogs').send(missingUrl).expect(400)
})


test('delete a blog by id', async () => {
  const blogToDelete = new Blog({ title:"test", author: "author", url: "hello.com", likes: 24, user: mock.testUser.id })
  await blogToDelete.save()

  await mock.authenticatedApi.delete(`/api/blogs/${blogToDelete._id.toString()}`).expect(204)
})

test('update a blog by id', async () => {
  const blogToUpdateContents = { title:"test", author: "author", url: "hello.com", likes: 24, user: mock.testUser.id }
  const blogToUpdate = new Blog(blogToUpdateContents)
  await blogToUpdate.save()
  const newBlogContent = { ...blogToUpdateContents, likes: 128 }

  await mock.authenticatedApi.put(`/api/blogs/${blogToUpdate._id.toString()}`)
    .send(newBlogContent)
    .expect(204)

  const blogsInDb = await mock.authenticatedApi.get('/api/blogs')
  const updatedBlog = blogsInDb.body.find(blog => blog.id === blogToUpdate._id.toString())
  expect(updatedBlog.likes).toBe(128)
})

test('api errors if token is not provided', async () => {
  await api.get('/api/blogs').expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})