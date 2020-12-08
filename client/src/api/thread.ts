import myAxios from '@util/myAxios'
import { GetThreadsRequestType } from '@type/thread.type'

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

const deleteThread = async ({ threadId }: { threadId: number }) => {
  const response = await myAxios.delete({ path: `/thread/${threadId}` })
  return response.data
}

export default {
  createThread,
  getThreads,
  deleteThread,
}
