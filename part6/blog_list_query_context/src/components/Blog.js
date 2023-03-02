import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import UserContext from '../UserContext'
import Toggable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [numLikes, setNumLikes] = useState(blog.likes)
  const userContext = useContext(UserContext)
  const user = userContext[0]
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation(
    async ({ id, newBlogData }) => await blogService.update(id, newBlogData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )
  const deleteBlogMutation = useMutation(
    async (id) => await blogService.deleteBlog(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleAddLike = async () => {
    setNumLikes(numLikes + 1)

    const newBlogData = {
      user: blog.user ? blog.user.id : null,
      likes: numLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    updateBlogMutation.mutate({ id: blog.id, newBlogData })
  }

  const handleDeletion = async () => {
    const remove = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (remove) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blogPost">
      {blog.title} {blog.author}
      <Toggable buttonLabel="show detail" className="blogPostDetail">
        <div>
          <p>url: {blog.url}</p>
          <p>
            likes: {numLikes} <button onClick={handleAddLike}>Like</button>
          </p>
          <p>created by: {blog.user ? blog.user.name : ''}</p>
          {user.username === blog.user.username && (
            <button onClick={handleDeletion}>Delete Post</button>
          )}
        </div>
      </Toggable>
    </div>
  )
}

export default Blog
