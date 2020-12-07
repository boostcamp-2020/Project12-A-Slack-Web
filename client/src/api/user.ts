import myAxios from '@util/myAxios'

const checkUserToken = async () => {
  const response = await myAxios.get({ path: '/user/status' })
  return response.data
}

const getUsersByChannel = async ({ channelId }: { channelId: number }) => {
  const response = await myAxios.get({ path: `/user/channel/${channelId}` })
  return response.data
}

export default {
  checkUserToken,
  getUsersByChannel,
}
