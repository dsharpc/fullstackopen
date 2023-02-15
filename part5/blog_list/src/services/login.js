import axios, { AxiosError } from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (e) {
    if (e instanceof AxiosError){
      return null
    } else {
      throw e
    }
  }
}

export default {
  login
}