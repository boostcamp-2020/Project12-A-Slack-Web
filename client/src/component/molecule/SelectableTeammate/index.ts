import { UserType } from '@type/user.type'

export { default } from './SelectableTeammate'

export interface SelectableTeammateProps {
  user: UserType
  onTeammateClick: () => void
  alreadyInChannel: boolean
  selected: boolean
}
