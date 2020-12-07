export interface ChannelResponseType {
  id: number
  name: string
  type: 'PRIVATE' | 'PUBLIC' | 'DM'
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface CreateChannelRequestType {
  name: string
  imageUrl: string
}

export interface JoinChannelRequestType {
  channelId: number
  userId: number
}

export interface ChannelRequestType {
  workspaceId?: number
}
