import myAxios from '@util/myAxios'
import { ThreadType } from '@store/thread'

interface RequestThreadType {
  channelId?: number
  content?: string
}

const createThread = async (data: RequestThreadType) => {
  const response = await myAxios.post({ path: '/thread', data })
  return response.data
}

const getThreads = async (data: RequestThreadType) => {
  const response = await myAxios.get({
    path: `/thread?channelId=${data.channelId}`,
  })
  return response.data.data
}

export default {
  createThread,
  getThreads,
}
