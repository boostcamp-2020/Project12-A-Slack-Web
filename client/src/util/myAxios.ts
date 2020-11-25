import axios from 'axios'

const serverURL =
  process.env.NODE_ENV === 'development'
    ? process.env.SERVER_DOMAIN_DEVELOP
    : process.env.SERVER_DOMAIN_PRODUCTION

const headerConfig = {
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

type axiosType = {
  path: string
  data?: object
}

type ResponseType = {
  success: boolean
  message?: string
  data?: object
}

const myAxios = {
  get({ path }: axiosType) {
    return axios.get<ResponseType>(URL + path, headerConfig)
  },

  post({ path, data }: axiosType) {
    return axios.post<ResponseType>(URL + path, data, headerConfig)
  },

  patch({ path, data }: axiosType) {
    return axios.patch<ResponseType>(URL + path, data, headerConfig)
  },

  delete({ path }: axiosType) {
    return axios.delete<ResponseType>(URL + path, headerConfig)
  },

  filepost({ path = '/fileupload', data }: axiosType) {
    return axios.post<ResponseType>(URL + path, data, fileUploadHeaderConfig)
  },
}

export default myAxios
