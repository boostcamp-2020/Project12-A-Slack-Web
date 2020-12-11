import { UserType } from '@type/user.type'

export { default } from './TeammateCard'

export interface TeammateCardProps {
  user: UserType
  loginUserId: number
}
