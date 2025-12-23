import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'App-Key': import.meta.env.VITE_APP_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

export default api
