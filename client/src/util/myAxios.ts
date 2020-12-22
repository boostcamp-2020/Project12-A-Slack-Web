import axios from 'axios'

export const serverURL =
  process.env.NODE_ENV === 'development'
    ? process.env.SERVER_DOMAIN_DEVELOP
    : process.env.SERVER_DOMAIN_PRODUCTION

export const headerConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

const fileUploadHeaderConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data;charset=utf-8;',
  },
}

const URL = `${serverURL}/api`

interface AxiosType {
  path: string
  data?: object | FormData
}

export type ResponseType = {
  success: boolean
  message?: string
  data: any
}

const myAxios = {
  get({ path }: AxiosType) {
    return axios.get<ResponseType>(URL + path, headerConfig)
  },

  post({ path, data }: AxiosType) {
    return axios.post<ResponseType>(URL + path, data, headerConfig)
  },

  patch({ path, data }: AxiosType) {
    return axios.patch<ResponseType>(URL + path, data, headerConfig)
  },

  delete({ path }: AxiosType) {
    return axios.delete<ResponseType>(URL + path, headerConfig)
  },

  filepost({ path, data }: AxiosType) {
    return axios.post<ResponseType>(URL + path, data, fileUploadHeaderConfig)
  },
}

export default myAxios
