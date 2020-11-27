import ReactionModel from '@model/reaction.model'
import { statusCode, resMessage } from '@util/constant'

interface ReactionType {
  content: string
  userId: number
  messageId: number
  reactionId?: number
}

const isValidNewReactionData = ({
  userId,
  content,
  messageId,
}: ReactionType) => {
  if (
    !userId ||
    !content ||
    !messageId ||
    userId < 1 ||
    content === '' ||
    messageId < 1
  )
    return false
  return true
}

const createReaction = async ({ userId, content, messageId }: ReactionType) => {
  if (!isValidNewReactionData({ userId, content, messageId })) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    await ReactionModel.create({ userId, content, messageId })
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

const deleteReaction = async ({ reactionId }: ReactionType) => {
  if (!reactionId || typeof reactionId === 'number') {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    await ReactionModel.destroy({ where: { id: reactionId } })
    return {
      code: statusCode.OK,
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

export default { createReaction, deleteReaction }
