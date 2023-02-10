const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else {
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

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