import { WorkspaceResponseType } from '@type/workspace.type'

export { default } from './WorkspaceSideBar'

export interface WorkspaceSideBarProps {
  workspaceList: WorkspaceResponseType[]
  currentWorkspaceId: number
}
