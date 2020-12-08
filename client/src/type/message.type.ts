import { CreateThreadRequestType } from './thread.type'

export interface UpdateMessageRequestType extends CreateThreadRequestType {
  messageId: number
}
