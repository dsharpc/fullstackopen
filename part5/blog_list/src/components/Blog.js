import { useState } from 'react'
import Toggable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [numLikes, setNumLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleAddLike = async () => {
    setNumLikes(numLikes + 1)

    const newBlogData = {
      user: blog.user ? blog.user.id : null,
      likes: numLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogService.update(blog.id, newBlogData)
  }

  const handleDeletion = async () => {
    const remove = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (remove) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div style={blogStyle} className="blogPost">
      {blog.title} {blog.author}
      <Toggable buttonLabel="show detail" className='blogPostDetail'>
        <div >
          <p>url: {blog.url}</p>
          <p>likes: {numLikes} <button onClick={handleAddLike}>Like</button></p>
          <p>created by: {blog.user ? blog.user.name : ''}</p>
          <button onClick={handleDeletion}>Delete Post</button>
        </div>
      </Toggable>
    </div>
  )
}

export default Blog