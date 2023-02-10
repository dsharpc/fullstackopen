const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const randomUser = await User.findOne({})

  const blog = new Blog({ ...request.body, user: randomUser._id })
  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else {
    const newBlog = await blog.save()
    randomUser.blogs = randomUser.blogs.concat(newBlog._id)
    await randomUser.save()

    response.status(201).json(newBlog)
  }

})

blogRouter.delete('/:id', async (request, response) => {
  const idToDelete = request.params.id

  await Blog.findByIdAndRemove(idToDelete)

  response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const idToUpdate = request.params.id
  const newBlogContent = request.body

  const updatedNote = await Blog.findByIdAndUpdate(idToUpdate, newBlogContent, { new: true })
  response.status(204).json(updatedNote)
})

module.exports = blogRouter