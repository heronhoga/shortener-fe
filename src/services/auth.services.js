import { loginApi, googleRedirectUrl } from '@/api/auth.api'
import { setToken } from '@/utils/token'

export const login = async (form) => {
  const { data } = await loginApi(form)

  if (data?.token) {
    setToken(data.token)
  }

  return data
}

export const loginWithGoogle = () => {
  window.location.href = googleRedirectUrl()
}
