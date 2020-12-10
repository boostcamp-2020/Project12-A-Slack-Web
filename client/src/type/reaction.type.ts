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
  channelId: number
  messageId: number
  content: string
}

export interface CreateReactionResponseType extends ResponseType {
  data: { reactionId: number }
}

export interface CreateReactionSocketResponseType {
  reaction: ReactionType
  channelId: number
  messageId: number
}

export interface DeleteReactionRequestType {
  channelId: number
  messageId: number
  reactionId: number
}

export interface DeleteReactionSocketResponseType {
  channelId: number
  messageId: number
  reactionId: number
}
