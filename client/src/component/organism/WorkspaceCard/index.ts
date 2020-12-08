export { default } from './WorkspaceCard'

export interface WorkspaceProps {
  workspace: Workspace
}

export interface User {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

export interface Workspace {
  id: number
  name: string
  imageUrl: string
  userProfileMax5: User[]
  userCount: number
}
