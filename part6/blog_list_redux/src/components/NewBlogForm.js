import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'

const NewBlogForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreationSubmit = async (event) => {
    event.preventDefault()
    const blogData = { title, author, url }
    dispatch(createBlog({ blogData, user }))
    dispatch(
      showNotification(
        `A new blog ${title} by ${author} has been added`,
        'success',
        5
      )
    )
  }

  return (
    <form onSubmit={handleCreationSubmit} id="new-blog-form">
      <h5>Create new Blog entry</h5>
      <p>
        Title:{' '}
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
        ></input>
      </p>
      <p>
        Author:{' '}
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
        ></input>
      </p>
      <p>
        Url:{' '}
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Url"
        ></input>
      </p>
      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlogForm
