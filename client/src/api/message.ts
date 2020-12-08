import myAxios from '@util/myAxios'
import { UpdateMessageRequestType } from '@type/message.type'

const updateMessage = async (data: UpdateMessageRequestType) => {
  const response = await myAxios.patch({
    path: `/message/${data.messageId}`,
    data,
  })
  return response.data
}

export default {
  updateMessage,
}
