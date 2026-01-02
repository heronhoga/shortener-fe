import { loginApi, loginWithGoogleApi, logoutApi, registerApi } from '@/api/auth.api'

export const login = async (form) => {
  const { data } = await loginApi({
    provider: 'local',
    email: form.email,
    password: form.password
  })
}

export const loginWithGoogle = async (googleToken) => {
  const { data } = await loginWithGoogleApi(googleToken)
}

export const register = async (form) => {
  const response = await registerApi(form)
  return response
}

export const logout = async () => {
  const response = await logoutApi()
  return response
}
