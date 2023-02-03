const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0){
    return 0
  }
  return blogs.reduce((max, item) => {
    return item.likes > max.likes ? item : max
  },blogs[0])
}

const mostBlogs = (blogs) => {
  const counts =  _.countBy(blogs.map(blog => blog.author))
  const maxKey = _.max(Object.keys(counts), key => counts[key])

  return { author: maxKey, blogs: counts[maxKey] }
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const summed = Object.entries(grouped).map(([name, blogs]) => {
    return { author: name, likes: blogs.reduce((sum, blog) => sum + blog.likes, 0) }
  })
  return favouriteBlog(summed)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}