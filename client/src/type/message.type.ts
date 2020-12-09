import {
  CreateThreadRequestType,
  MessageType,
  GetThreadResponseType,
} from './thread.type'
import { ResponseType } from './response.type'

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
