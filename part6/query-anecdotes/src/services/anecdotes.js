import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newData) => {
  const response = await axios.post(baseUrl, newData)
  return response.data
}

const update = async (newData) => {
  const response = await axios.put(`${baseUrl}/${newData.id}`, newData)
  return response.data
}


export default { getAll, create, update }