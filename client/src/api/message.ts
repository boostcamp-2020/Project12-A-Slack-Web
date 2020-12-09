import myAxios from '@util/myAxios'
import {
  UpdateMessageRequestType,
  GetMessagesResponseType,
} from '@type/message.type'

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

export default {
  getMessages,
  updateMessage,
}
