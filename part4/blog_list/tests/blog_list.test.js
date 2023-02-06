const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const { update } = require('lodash')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = testHelper.testBlogs.map(blog => new Blog(blog))
  const blogPromises = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromises)

})

test('returns the correct amount of blogs', async () => {
  const blogsInDb = await api.get('/api/blogs')

  expect(blogsInDb.body).toHaveLength(testHelper.testBlogs.length)

})

test('the unique identifier for a blog is id', async () => {
  const blogsInDb = await api.get('/api/blogs')

  const exampleBlog = blogsInDb.body[0]

  expect(exampleBlog.id).toBeDefined()
})

test('post request creates a new blog', async () => {
  const blogToAdd = { title: "test", author:"test", url: "test.com", likes: 5 }
  await api.post('/api/blogs').send( blogToAdd )

  const blogsInDb = await api.get('/api/blogs')

  expect(blogsInDb.body).toHaveLength(testHelper.testBlogs.length + 1)
  expect(blogsInDb.body.map(blog => blog.title)).toContainEqual(blogToAdd.title)
})

test('missing likes defaults to zero', async () => {
  const blogToAdd = { title: "test", author:"test", url: "test.com" }
  await api.post('/api/blogs').send( blogToAdd )

  const blogsInDb = await api.get('/api/blogs')

  const justAddedBlog = blogsInDb.body.find(blog => blog.title === blogToAdd.title)
  expect(justAddedBlog.likes).toBe(0)

})

test('missing title raises 400 error', async () => {
  const missingTitle = { author: "test", url: "test" }
  await api.post('/api/blogs').send(missingTitle).expect(400)
})

test('missing url raises 400 error', async () => {
  const missingUrl = { author: "test", title: "test" }
  await api.post('/api/blogs').send(missingUrl).expect(400)
})


test('delete a blog by id', async () => {
  const blogsInDb = await api.get('/api/blogs')
  const idToDelete = blogsInDb.body[0].id

  await api.delete(`/api/blogs/${idToDelete}`).expect(204)
})

test('update a blog by id', async () => {
  let blogsInDb = await api.get('/api/blogs')
  const blogToUpdate = blogsInDb.body[0]
  const newBlogContent = { ...blogsInDb, likes: 128 }

  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogContent)
    .expect(204)

  blogsInDb = await api.get('/api/blogs')
  const updatedBlog = blogsInDb.body.find(blog => blog.id === blogToUpdate.id)
  expect(updatedBlog.likes).toBe(128)
})


afterAll(async () => {
  await mongoose.connection.close()
})