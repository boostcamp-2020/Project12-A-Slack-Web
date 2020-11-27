export { default } from './Avatar'

export interface AvatarProps {
  user: object
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  clickable: boolean
  // onClick?: () => void
}
