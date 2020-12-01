import myAxios from '@util/myAxios'

interface CreateThreadType {
  content: string
  channelId: number
}

const createThread = async (data: CreateThreadType) => {
  const response = await myAxios.post({ path: '/thread', data })
  return response.data
}

export default {
  createThread,
}
