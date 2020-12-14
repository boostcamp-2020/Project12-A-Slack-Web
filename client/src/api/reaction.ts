import myAxios from '@util/myAxios'
import { OnlySuccessResponseType } from '@type/response.type'
import {
  CreateReactionRequestType,
  CreateReactionResponseType,
  DeleteReactionRequestType,
} from '@type/reaction.type'

const createReaction = async (
  data: CreateReactionRequestType,
): Promise<CreateReactionResponseType> => {
  const response = await myAxios.post({ path: '/reaction', data })
  return response.data
}

const deleteReaction = async ({
  reactionId,
}: DeleteReactionRequestType): Promise<OnlySuccessResponseType> => {
  const response = await myAxios.delete({
    path: `/reaction/${reactionId}`,
  })
  return response.data
}

export default {
  createReaction,
  deleteReaction,
}
