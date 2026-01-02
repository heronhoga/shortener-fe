import api from './index'

export const loginApi = (payload) => {
  return api.post('/users/login', payload)
}

export const loginWithGoogleApi = (googleToken) => {
  return api.post('/users/login', {
    provider: 'google',
    token: googleToken,
  })
}

export const registerApi = (payload) => {
  return api.post('/users/register', payload)
}

export const logoutApi =  () => {
  return api.post('/users/logout', {})
}