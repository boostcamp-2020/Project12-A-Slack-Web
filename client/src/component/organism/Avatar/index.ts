import { ImageType } from '@atom/Image'

export { default } from './Avatar'

export interface AvatarProps {
  user: {
    id: number
    email: string
    name: string
    profileImageUrl: string
  }
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  clickable?: boolean
  avatarImageStyle?: ImageType.StyleAttributes
  onMessageButtonClick?: () => void
}
