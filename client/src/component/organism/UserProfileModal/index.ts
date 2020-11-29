import { ModalWrapperType } from '@atom/ModalWrapper'

export { default } from './UserProfileModal'

export interface UserProfileModalProps {
  user: object
  modalAttributes?: ModalWrapperType.StyleAttributes
  onMessageButtonClick?: () => void
  onClose?: () => void
}
