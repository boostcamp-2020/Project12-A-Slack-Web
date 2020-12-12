import { UserType } from '@type/user.type'

export { default } from './TeammateList'

export interface TeammateListProps {
  teammateList: UserType[]
  onTeammateClick: () => void
  loginUserId: number
}
