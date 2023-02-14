import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ setNotificationMessage, setNotificationType }) => {

  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')


  const handleCreationSubmit = async (event) => {
    event.preventDefault()
    const blogData = { title, author, url}
    await blogService.create(blogData)
    setNotificationMessage(`A new blog ${title} by ${author} has been added`)
    setNotificationType('success')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)

  }
  

  return (
    <form onSubmit={handleCreationSubmit}>
      <h5>Create new Blog entry</h5>
      <p>Title: <input value={title} onChange={({ target }) => setTitle(target.value)}></input></p>
      <p>Author: <input value={author} onChange={({ target }) => setAuthor(target.value)}></input></p>
      <p>Url: <input value={url} onChange={({ target }) => setUrl(target.value)}></input></p>
      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlogForm