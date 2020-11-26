import { ModalWrapperType } from '@atom/ModalWrapper'

export { default } from './MessageActionsMenu'

export interface MessageActionsMenuProps {
  targetId: number
  modalAttributes?: ModalWrapperType.StyleAttributes
  onDeleteButtonClick: () => void
  onEditButtonClick: () => void
  onClose?: () => void
}
