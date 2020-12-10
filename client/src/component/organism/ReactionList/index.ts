export { default } from './ReactionList'

export interface ReactionListProps {
  reactionArr: ReactionType[]
  loginUserId: number
  onAddReactionButtonClick?: () => void
  onReactionClick: (emoji: string) => void
}

interface ReactionType {
  id: number
  content: string
  User: UserType
}

interface UserType {
  id: number
  email: string
  name: string
  profileImageUrl: string
}
