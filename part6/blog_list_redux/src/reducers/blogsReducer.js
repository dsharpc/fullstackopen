import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      const { newBlog, user } = action.payload
      return state.concat({ ...newBlog, user })
    },
    updateBlog(state, action) {
      const blogData = action.payload
      return state.map((blog) => (blog.id === blogData.id ? blogData : blog))
    },
    removeBlog(state, action) {
      const blogId = action.payload
      return state.filter((blog) => blog.id !== blogId)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogsSlice.actions

export default blogsSlice.reducer

export const getBlogsFromBackend = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ blogData, user }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogData)

    dispatch(addBlog({ newBlog, user }))
  }
}

export const addLike = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogToLike = blogs.find((blog) => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    await blogService.update(id, likedBlog)
    dispatch(updateBlog({ ...likedBlog, user: blogToLike.user }))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogToComment = blogs.find((blog) => blog.id === id)
    const addedComment = await blogService.addComment(id, comment)
    const commentedBlog = {
      ...blogToComment,
      comments: blogToComment.comments.concat(addedComment),
    }
    dispatch(updateBlog(commentedBlog))
  }
}
