import { ModalWrapperType } from '@atom/ModalWrapper'

export { default } from './UserProfileModal'

export interface UserProfileModalProps {
  user: {
    id: number
    email: string
    name: string
    profileImageUrl: string
  }
  modalAttributes?: ModalWrapperType.StyleAttributes
  onMessageButtonClick?: () => void
  onClose?: () => void
}
