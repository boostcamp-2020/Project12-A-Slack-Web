import FileModel from '@model/file.model'
import { statusCode, resMessage } from '@util/constant'

interface FileType {
  url: string
  type: string
  messageId: number
}

const isValidNewFileData = ({ url, type, messageId }: FileType) => {
  if (!url || !type || !messageId || url === '' || type === '' || messageId < 1)
    return false
  return true
}

const createFile = async ({ url, type, messageId }: FileType) => {
  if (!isValidNewFileData({ url, type, messageId })) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: true, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    await FileModel.create({ url, type, messageId })
    return {
      code: statusCode.CREATED,
      json: { success: true },
    }
  } catch (error) {
    console.log(error)
    return {
      code: statusCode.DB_ERROR,
      json: { success: false, message: resMessage.DB_ERROR },
    }
  }
}

export default { createFile }
