import myAxios from '@util/myAxios'
import {
  UpdateMessageRequestType,
  GetMessagesResponseType,
  CreateMessageRequestType,
  CreateMessageResponseType,
  MessageSocketResponseType,
} from '@type/message.type'

const createMessage = async (
  data: CreateMessageRequestType,
): Promise<CreateMessageResponseType> => {
  const response = await myAxios.post({ path: '/message', data })
  return response.data
}

const getMessages = async (
  threadId: number,
): Promise<GetMessagesResponseType> => {
  const response = await myAxios.get({
    path: `/message?threadId=${threadId}`,
  })
  return response.data
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

const deleteMessage = async ({
  messageId,
  threadId,
}: {
  messageId: number
  threadId: number
}): Promise<MessageSocketResponseType> => {
  const response = await myAxios.delete({
    path: `/message/${messageId}?threadId=${threadId}`,
  })
  return response.data
}

export default {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
}
