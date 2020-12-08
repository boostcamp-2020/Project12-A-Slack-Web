import myAxios from '@util/myAxios'

import { ChannelRequestType, JoinChannelRequestType } from '@type/channel.type'

// TODO: workspace 전체의 채널을 어떻게 읽을 것인가
const getChannels = async ({ workspaceId }: ChannelRequestType) => {
  const response = await myAxios.get({
    path: `/channel?workspaceId=${workspaceId}`,
  })

  return response.data
}

const joinChannel = async ({ channel, userId }: JoinChannelRequestType) => {
  const response = await myAxios.post({
    path: `/channel/${channel.id}/join`,
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
