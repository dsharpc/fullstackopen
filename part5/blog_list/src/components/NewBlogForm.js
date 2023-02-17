import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ setNotificationMessage, setNotificationType, blogs, setBlogs, user }) => {

  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')


  const handleCreationSubmit = async (event) => {
    event.preventDefault()
    const blogData = { title, author, url }
    const addedBlog = await blogService.create(blogData)
    setNotificationMessage(`A new blog ${title} by ${author} has been added`)
    setNotificationType('success')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)
    setBlogs(blogs.concat({ ...addedBlog, user }))

  }


  return (
    <form onSubmit={handleCreationSubmit} id='new-blog-form'>
      <h5>Create new Blog entry</h5>
      <p>Title: <input value={title} onChange={({ target }) => setTitle(target.value)} placeholder='Title'></input></p>
      <p>Author: <input value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='Author'></input></p>
      <p>Url: <input value={url} onChange={({ target }) => setUrl(target.value)} placeholder='Url'></input></p>
      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlogForm