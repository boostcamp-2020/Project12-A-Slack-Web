import myAxios from '@util/myAxios'

interface RequestThreadType {
  channelId?: number
  content?: string
}

const createThread = async (data: RequestThreadType) => {
  const response = await myAxios.post({ path: '/thread', data })
  return response.data
}

const getThreads = async (channelId: number) => {
  const response = await myAxios.get({
    path: `/thread?channelId=${channelId}`,
  })
  return response.data.data
}

export default {
  createThread,
  getThreads,
}
