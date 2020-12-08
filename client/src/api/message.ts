import myAxios from '@util/myAxios'
import { UpdateMessageRequestType } from '@type/message.type'
import { MessageType } from '@type/thread.type'

const getMessages = async (threadId: number) => {
  const response = await myAxios.get({
    path: `/message?threadId=${threadId}`,
  })
  return response.data as { success: true; data: MessageType[] }
}

const updateMessage = async (originalData: UpdateMessageRequestType) => {
  const data: object = {
    content: originalData.content,
    fileInfoList: originalData.fileInfoList,
  }
  const response = await myAxios.patch({
    path: `/message/${originalData.messageId}`,
    data,
  })
  return response.data
}

export default {
  getMessages,
  updateMessage,
}
