import { UserType } from './user.type'
import { MessageType } from './message.type'
import { ResponseType } from './response.type'

export interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  messageCount: number
  profileImageUrl: string[] | null
  User: UserType
}

export interface GetThreadsRequestType {
  channelId: number
  lastThreadId?: number
}

export interface GetThreadResponseType {
  id: number
  createdAt: string
  updatedAt: string
  channelId: number
  User: UserType
  headMessage: MessageType
  replyCount: number
  userProfileMax5: string[]
  commenterCount: number
  lastReplyTime: string
}

export interface CreateThreadRequestType {
  content: string
  channelId: number
  fileInfoList: { filePath: string; type: string }[] | null
}

export interface CreateThreadResponseType extends ResponseType {
  data: { threadId: string }
}

export interface CurrentThreadType {
  thread: GetThreadResponseType | null
  messageList: MessageType[]
}

export interface UpdateThreadRequestType {
  content: string
  fileInfoList: { filePath: string; type: string }[] | null
  messageId: number
  threadId: number
}
