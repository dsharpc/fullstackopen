import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { addLike, deleteBlog, addComment } from '../reducers/blogsReducer'

const BlogDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const selectedBlog = blogs.find((blog) => blog.id === params.id)

  const handleDeletion = async () => {
    const remove = window.confirm(
      `Remove blog ${selectedBlog.title} by ${selectedBlog.author}?`
    )
    if (remove) {
      dispatch(deleteBlog(selectedBlog.id))
      navigate('/')
    }
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(selectedBlog.id, event.target.commentText.value))
    event.target.commentText.value = ''
  }

  if (selectedBlog) {
    return (
      <div>
        <h3>{selectedBlog.title}</h3>
        <p>Url: {selectedBlog.url}</p>
        <p>
          Likes: {selectedBlog.likes}{' '}
          <button onClick={() => dispatch(addLike(selectedBlog.id))}>
            Like
          </button>
        </p>
        <p>Added by: {selectedBlog.user.name}</p>
        {user.username === selectedBlog.user.username && (
          <button onClick={handleDeletion}>Delete Post</button>
        )}
        <div>
          <h4>Comments</h4>
          <form onSubmit={handleCommentSubmit}>
            <input name="commentText" placeholder="Type comment here"></input>
            <button type="submit">Create</button>
          </form>
          <ul>
            {selectedBlog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  } else {
    return <h3>Blog not found</h3>
  }
}

export default BlogDetail
