import { UserType as User } from '@type/user.type'

export { default } from './WorkspaceCard'

export interface WorkspaceProps {
  workspace: Workspace
}

export interface Workspace {
  id: number
  name: string
  imageUrl: string
  userProfileMax5: User[]
  userCount: number
}
