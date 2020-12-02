export { default } from './ReactionButton'

export interface ReactionButtonProps {
  reactionBundle: ReactionType[]
  loginUserId: number
  onDeleteClick?: () => void
  onAddClick?: () => void
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
