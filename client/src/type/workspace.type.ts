export interface WorkspaceResponseType extends Object {
  id: number
  name: string
  imageUrl: string
}

export interface CreateWorkspaceRequestType {
  name: string
  imageUrl: string
}

export interface JoinWorkspaceRequestType {
  workspaceId: number
}
