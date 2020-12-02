export { default } from './Reaction'

export interface ReactionProps {
  reactionContent: string
  members: UserType[]
  loginUserId: number
  onDeleteClick?: () => void
  onAddClick?: () => void
}

// interface ReactionType {
//   id: number
//   content: string
//   User: UserType
// }

interface UserType {
  id: number
  email: string
  name: string
  profileImageUrl: string
}
