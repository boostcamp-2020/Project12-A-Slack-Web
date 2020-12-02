import myAxios from '@util/myAxios'

const checkUserToken = async () => {
  const response = await myAxios.get({ path: '/user/status' })
  return response.data
}

export default checkUserToken
