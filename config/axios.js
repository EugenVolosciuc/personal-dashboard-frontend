import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://localhost:3001' : 'http://localhost:3001'
axios.defaults.withCredentials = true
axios.defaults.params = {}

export const fetcher = async url => {
  const { data } = await axios.get(url)

  return data
}