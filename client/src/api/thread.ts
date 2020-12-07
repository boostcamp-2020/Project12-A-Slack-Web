import myAxios from '@util/myAxios'
import { GetThreadsRequestType } from '@store/reducer/thread.reducer'

interface ThreadRequestType {
  channelId?: number
  content?: string
}

const createThread = async (data: ThreadRequestType) => {
  const response = await myAxios.post({ path: '/thread', data })
  return response.data
}

const getThreads = async ({
  channelId,
  lastThreadId,
}: GetThreadsRequestType) => {
  const response = await myAxios.get({
    path: `/thread?channelId=${channelId}${
      lastThreadId ? `&lastThreadId=${lastThreadId}` : ''
    }`,
  })
  return response.data.data
}

export default {
  createThread,
  getThreads,
}
