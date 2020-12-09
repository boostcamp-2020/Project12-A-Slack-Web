import { CreateThreadRequestType, MessageType } from './thread.type'
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
