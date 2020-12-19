import { UserType } from '@type/user.type'

export { default } from './ReactionList'

export interface ReactionListProps {
  reactionArr: ReactionType[]
  loginUserId: number
  onReactionClick: (emoji: string) => void
}

export interface ReactionType {
  id: number
  content: string
  User: UserType
}
