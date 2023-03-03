import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const params = useParams()
  const blogs = useSelector((state) => state.blogs)

  const userBlogs = blogs.filter((blog) => blog.user.id === params.id)

  if (userBlogs.length > 0) {
    return (
      <div>
        <h1>User: {userBlogs[0].user.name}</h1>
        <h4>Added blogs</h4>
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return <p>No blogs found for user ID: {params.id}</p>
  }
}

export default User
