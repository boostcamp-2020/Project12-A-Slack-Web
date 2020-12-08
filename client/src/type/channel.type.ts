import { UserType } from '@type/user.type'

export interface ChannelCardType extends Object {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  memberCount: number
  joined: boolean
}

export interface ChannelType {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface CurrentChannelType extends ChannelType {
  memberCount: number
  memberMax3: UserType[]
}

export interface CreateChannelRequestType {
  name: string
  imageUrl: string
}

export interface JoinChannelRequestType {
  channel: ChannelCardType
  userId?: number
}

export interface ChannelRequestType {
  workspaceId?: number
}
