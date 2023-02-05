const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

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