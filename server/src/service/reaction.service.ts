import ReactionModel from '@model/reaction.model'
import { statusCode, resMessage } from '@util/constant'

interface ReactionType {
  content: string
  userId: number
  messageId: number
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

const createOrRemoveReaction = async ({
  userId,
  content,
  messageId,
}: ReactionType) => {
  if (!isValidNewReactionData({ userId, content, messageId })) {
    return {
      code: statusCode.BAD_REQUEST,
      json: { success: false, message: resMessage.OUT_OF_VALUE },
    }
  }
  try {
    const targetReaction = await ReactionModel.findOne({
      where: { userId, content, messageId },
    })
    if (targetReaction) {
      await ReactionModel.destroy({ where: { id: targetReaction.id } })
      return {
        code: statusCode.OK,
        json: { success: true },
      }
    }
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

export default { createOrRemoveReaction }
