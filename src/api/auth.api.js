import api from './index'

export const loginApi = (payload) => {
  return api.post('/auth/login', payload)
}

export const googleRedirectUrl = () => {
  return `${import.meta.env.VITE_API_URL}/auth/google`
}
