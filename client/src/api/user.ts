import myAxios from '@util/myAxios'

const getUserInfo = async () => {
  const response = await myAxios.get({ path: '/user/status' })
  return response.data
}

export default { getUserInfo }
