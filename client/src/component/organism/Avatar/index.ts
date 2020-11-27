export { default } from './Avatar'

export interface AvatarProps {
  user: object
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  clickable?: boolean
  onMessageButtonClick?: () => void
}
