export { default } from './ReactionList'

export interface ReactionListProps {
  reactions: ReactionType[]
  loginUserId: number
  onDeleteClick?: () => void
  onAddClick?: () => void
  onAddReactionsButtonClick?: () => void
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
