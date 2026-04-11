import api from './index'

export const getLinksApi = (params) => {
  return api.get('/links', { params })
}