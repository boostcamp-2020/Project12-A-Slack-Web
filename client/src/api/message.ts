import myAxios from '@util/myAxios'
import { UpdateMessageRequestType } from '@type/message.type'

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
  updateMessage,
}

// threadId 넣고 있었다.
