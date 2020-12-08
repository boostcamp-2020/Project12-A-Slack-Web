import { UserType } from '@type/user.type'

export interface ChannelType {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface CurrentChannelType extends ChannelType {
  memberCount: number
  memberMax3: UserType[]
}

export interface CreateChannelRequestType {
  name: string
  type: string
  workspaceId: number
}

export interface JoinChannelRequestType {
  channelId: number
  userId: number
}

export interface ChannelRequestType {
  workspaceId?: number
}
