import { loginApi, loginWithGoogleApi, registerApi } from '@/api/auth.api'
import { setToken } from '@/utils/token'

export const login = async (form) => {
  const { data } = await loginApi({
    provider: 'local',
    email: form.email,
    password: form.password,
  })

  setToken(data.token)
}

export const loginWithGoogle = async (googleToken) => {
  const { data } = await loginWithGoogleApi(googleToken)
  setToken(data.token)
}

export const register = async (form) => {
  const response = await registerApi(form)
  return response
}
