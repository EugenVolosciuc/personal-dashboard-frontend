import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:3001'
axios.defaults.withCredentials = true
axios.defaults.params = {}

export const fetcher = async (url, params, errorHandler) => {
  try {
    const { data } = await axios.get(url, {
      params
    })

    return data
  } catch (error) {
    if (errorHandler) errorHandler(error)

    return error
  }
}