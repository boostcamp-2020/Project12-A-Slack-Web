export { default } from './ReactionList'

export interface ReactionListProps {
  reactionArr: ReactionType[]
  loginUserId: number
  onDeleteClick?: () => void
  onAddClick?: () => void
  onAddReactionButtonClick?: () => void
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
