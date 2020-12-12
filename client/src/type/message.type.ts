import { UserType } from './user.type'
import { ResponseType } from './response.type'
import { CreateThreadRequestType, GetThreadResponseType } from './thread.type'

interface FileType {
  id: number
  url: string
  type: string
  createdAt?: string
  updatedAt?: string
  messageId?: number
}

interface ReactionType {
  id: number
  content: string
  createdAt?: string
  updatedAt?: string
  messageId?: number
  userId?: number
  User: UserType
}

export interface MessageType {
  id: number
  content: string
  isHead?: false
  createdAt: string
  updatedAt: string
  userId?: number
  threadId?: number
  User: UserType
  File: FileType[]
  Reactions: ReactionType[]
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
  userIdList: number[]
}

export interface MessageSocketResponseType extends ResponseType {
  data: MessageSocketResponseDataType
}

export interface DeleteMessageRequestType {
  messageId: number
  threadId: number
}

export interface DeleteMessageSocketResponseType {
  threadId?: number
  thread?: GetThreadResponseType
  messageId?: number
}

export interface UpdateMessageRequestType {
  content: string
  fileInfoList: { filePath: string; type: string }[] | null
  messageId: number
}
