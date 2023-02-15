import Blog from './Blog'

const Blogs = ({ blogs, setBlogs}) => {

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
    <h2>Blogs</h2>
    { sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)}
    </div>
  )
}

export default Blogs