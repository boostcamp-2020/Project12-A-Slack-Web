import myAxios from '@util/myAxios'
import {
  GetThreadsRequestType,
  CreateThreadRequestType,
  UpdateThreadRequestType,
} from '@type/thread.type'

const createThread = async (data: CreateThreadRequestType) => {
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

const updateThread = async (data: UpdateThreadRequestType) => {
  const response = await myAxios.patch({
    path: `/message/${data.messageId}`,
    data,
  })
  return response.data
}

export default {
  createThread,
  getThreads,
  deleteThread,
  updateThread,
}
