import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (blogData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const update = async (blogId, newBlogData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlogData, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const addComment = async (blogId, comment) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { content: comment },
    config
  )
  return response.data
}

const blogService = { getAll, create, update, deleteBlog, addComment, setToken }
export default blogService
