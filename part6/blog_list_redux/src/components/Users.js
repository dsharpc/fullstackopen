import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)

  const countUsers = blogs.reduce((count, blog) => {
    const key = `${blog.user.name}_${blog.user.id}`
    count[key] = (count[key] || 0) + 1
    return count
  }, {})

  return (
    <div>
      <h1>Users stats</h1>
      {Object.entries(countUsers).map(([user_id, num]) => {
        const [user, id] = user_id.split('_')
        return (
          <p key={id}>
            <Link to={`${id}`}>{user}</Link>- {num}
          </p>
        )
      })}
    </div>
  )
}

export default Users
