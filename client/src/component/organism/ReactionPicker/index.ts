import { ModalWrapperType } from '@atom/ModalWrapper'

export { default } from './ReactionPicker'

export interface ReactionPickerProps {
  targetId: number
  modalAttributes?: ModalWrapperType.StyleAttributes
  onReactionClick: (emoji: string) => void
  onClose?: () => void
}
