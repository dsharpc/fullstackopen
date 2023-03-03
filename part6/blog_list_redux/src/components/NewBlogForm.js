import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { Button, Form } from 'react-bootstrap'

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
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={handleCreationSubmit} id="new-blog-form">
      <h5>Create new Blog entry</h5>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
        />
        <Form.Label>Author:</Form.Label>
        <Form.Control
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
        />
        <Form.Label>Url:</Form.Label>
        <Form.Control
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Url"
        />
        <Button variant="success" type="submit">
          Create
        </Button>
      </Form.Group>
    </Form>
  )
}

export default NewBlogForm
