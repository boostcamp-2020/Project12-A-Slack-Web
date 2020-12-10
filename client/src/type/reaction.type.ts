import { UserType } from './user.type'
import { ResponseType } from './response.type'

interface ReactionType {
  id: number
  content: string
  createdAt?: string
  updatedAt?: string
  messageId?: number
  userId?: number
  User: UserType
}

export interface CreateReactionRequestType {
  messageId: number
  content: string
}

export interface CreateReactionResponseType extends ResponseType {
  data: { reactionId: number }
}

export interface DeleteReactionRequestType {
  messageId: number
  reactionId: number
}

export interface DeleteReactionSocketResponseType {
  messageId?: number
  reactionId?: number
}
