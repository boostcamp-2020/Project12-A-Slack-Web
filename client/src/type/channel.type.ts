export interface ChannelCardType extends Object {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  memberCount: number
  joined: boolean
}

export interface ChannelResponseType {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
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
