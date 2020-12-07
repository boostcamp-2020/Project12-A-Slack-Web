import myAxios from '@util/myAxios'

const getUserInfo = async () => {
  const response = await myAxios.get({ path: '/user/status' })
  return response.data
}

const getUsersByChannel = async ({ channelId }: { channelId: number }) => {
  const response = await myAxios.get({ path: `/user/channel/${channelId}` })
  return response.data
}

export default {
  getUserInfo,
  getUsersByChannel,
}
