const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
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