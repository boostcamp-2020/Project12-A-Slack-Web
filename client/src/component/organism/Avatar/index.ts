import { ImageType } from '@atom/Image'

export { default } from './Avatar'

export interface AvatarProps {
  user: object
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  clickable?: boolean
  avatarImageStyle?: ImageType.StyleAttributes
  onMessageButtonClick?: () => void
}
