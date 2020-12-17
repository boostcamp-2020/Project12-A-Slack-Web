import { UserType as User } from './user.type'

export interface CurrentWorkSpaceInfoRequestType {
  id: number
}
export interface CurrentWorkSpaceInfoResponseType {
  id: number
  name: string
  imageUrl: string
}
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

export interface CheckWorkspaceRequestType {
  name: string
}

export interface JoinWorkspaceRequestType {
  workspaceId: number
}

export interface SendActiveUserIdType {
  userId: number
}

export interface ReceiveActiveUserListType {
  activeUserList: number[]
}

export interface GetTeammatesRequestType {
  workspaceId: number
  searchKeyword: string
}
