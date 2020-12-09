import { UserType } from './user.type'
import { ResponseType } from './response.type'
import { CreateThreadRequestType, GetThreadResponseType } from './thread.type'

interface FileType {
  id: number
  url: string
  type: string
  createdAt?: string
  updatedAt?: string
}

interface ReactionType {
  id: number
  content: string
  createdAt?: string
  updatedAt?: string
  User: UserType
}

export interface MessageType {
  id: number
  content: string
  isHead?: false
  createdAt: string
  updatedAt: string
  User: UserType
  File: FileType[]
  Reactions: ReactionType[]
}

export interface UpdateMessageRequestType extends CreateThreadRequestType {
  messageId: number
  threadId?: number
}

export interface GetMessagesResponseType extends ResponseType {
  data: MessageType[]
}

export interface CreateMessageRequestType extends CreateThreadRequestType {
  threadId: number
}

export interface CreateMessageResponseType extends ResponseType {
  data: { messageId: number }
}

export interface MessageSocketResponseDataType {
  thread: GetThreadResponseType
  message: MessageType
}

export interface MessageSocketResponseType extends ResponseType {
  data: MessageSocketResponseDataType
}

export interface MessageWithThreadIdType extends MessageType {
  threadId: number
}
