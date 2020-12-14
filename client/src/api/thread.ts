import myAxios from '@util/myAxios'
import {
  GetThreadsRequestType,
  CreateThreadRequestType,
  CreateThreadResponseType,
} from '@type/thread.type'
import { OnlySuccessResponseType } from '@type/response.type'

const createThread = async (
  data: CreateThreadRequestType,
): Promise<CreateThreadResponseType> => {
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

const deleteThread = async ({
  threadId,
}: {
  threadId: number
}): Promise<OnlySuccessResponseType> => {
  const response = await myAxios.delete({ path: `/thread/${threadId}` })
  return response.data
}

export default {
  createThread,
  getThreads,
  deleteThread,
}
