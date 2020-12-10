export { default } from './ActionBar'

export interface ActionBarProps {
  targetType: 'THREAD' | 'MESSAGE'
  targetId: number
  targetAuthorId: number
  loginUserId: number
  onDeleteButtonClick: () => void
  onEditButtonClick: () => void
  onReplyButtonClick?: () => void
  onReactionClick: (emoji: string) => void
}
