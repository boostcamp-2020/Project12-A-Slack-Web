import myAxios from '@util/myAxios'

interface ChannelRequestType {
  workspaceId?: number
  channelId?: number
  userId?: number
}

// TODO: workspace 전체의 채널을 어떻게 읽을 것인가
const getChannels = async ({ workspaceId }: ChannelRequestType) => {
  const response = await myAxios.get({
    path: `/channel?workspaceId=${workspaceId}`,
  })

  return response.data
}

const joinChannel = async ({ channelId, userId }: ChannelRequestType) => {
  const response = await myAxios.post({
    path: `/${channelId}/join`,
    data: { userId },
  })
  return response.data
}

const getChannelInfo = async (channelId: number) => {
  const response = await myAxios.get({
    path: `/channel/${channelId}`,
  })

  return response.data
}

export default { getChannels, joinChannel, getChannelInfo }
