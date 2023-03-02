import { useDispatch } from 'react-redux'
import Toggable from './Toggable'
import { addLike, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDeletion = async () => {
    const remove = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (remove) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle} className="blogPost">
      {blog.title} {blog.author}
      <Toggable buttonLabel="show detail" className="blogPostDetail">
        <div>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}{' '}
            <button onClick={() => dispatch(addLike(blog.id))}>Like</button>
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
