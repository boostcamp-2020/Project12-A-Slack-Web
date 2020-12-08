interface User {
  id: number
  email: string
  name: string
  profileImageUrl: string
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
}

export interface JoinWorkspaceRequestType {
  workspaceId: number
}
