import { UserType } from '@type/user.type'

export { default } from './SelectedTeammate'

export interface SelectedTeammateProps {
  user: UserType
  onDeleteClick?: () => void
}
