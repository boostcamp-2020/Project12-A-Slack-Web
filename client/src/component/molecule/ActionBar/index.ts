export { default } from './ActionBar'

export interface ActionBarProps {
  targetType: 'THREAD' | 'MESSAGE'
  targetId: number
  targetAuthorId: number
  loginUserId: number
  onReactionClick?: () => void
  onReplyButtonClick?: () => void
  onMoreActionsButtonClick?: () => void
}
