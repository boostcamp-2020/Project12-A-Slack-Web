import { UserType as User } from './user.type'

export interface WorkspaceResponseType extends Object {
  id: number
  name: string
  imageUrl: string
  userProfileMax5: User[]
  userCount: number
}

export interface CreateWorkspaceRequestType {
  name: string
  imageUrl: string
  channelName: string
}

export interface JoinWorkspaceRequestType {
  workspaceId: number
}
