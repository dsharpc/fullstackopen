import { useState, useContext } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import NotificationContext from '../NotificationContext'
import blogService from '../services/blogs'

const NewBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const notificationContext = useContext(NotificationContext)
  const notificationDispatch = notificationContext[1]
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(
    async (newBlog) => await blogService.create(newBlog),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )

  const handleCreationSubmit = async (event) => {
    event.preventDefault()
    const blogData = { title, author, url }
    newBlogMutation.mutate(blogData)
    notificationDispatch({
      display: 'SHOW',
      message: `A new blog ${title} by ${author} has been added`,
      type: 'success',
    })
    setTimeout(() => {
      notificationDispatch({ display: 'HIDE' })
    }, 2000)
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
