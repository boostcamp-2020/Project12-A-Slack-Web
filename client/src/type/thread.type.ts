import { UserType } from './user.type'

interface FileType {
  id: number
  url: string
  type: string
  createdAt: string
  updatedAt: string
  profileImageUrl: string
}

interface ReactionType {
  id: number
  content: string
  User: UserType
}

export interface ThreadType {
  id: number
  createdAt: string
  updatedAt: string
  messageCount: number
  profileImageUrl: string[] | null
  User: UserType
}

export interface MessageType {
  id: number
  content: string
  isHead: true
  createdAt: string
  updatedAt: string
  User: UserType
  File: FileType[]
  Reactions: ReactionType[]
}

export interface GetThreadsRequestType {
  channelId: number
  lastThreadId?: number
}

export interface GetThreadResponseType {
  id: number
  createdAt: string
  updatedAt: string
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

export interface GetChannelInfoResponseType extends Object {
  id: number
  type: string
  name: string
  createdAt: string
  updatedAt: string
  user: UserType[]
}
