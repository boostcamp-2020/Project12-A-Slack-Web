export { default } from './ReactionButton'

export interface ReactionButtonProps {
  reactionBundle: ReactionType[]
  loginUserId: number
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
