import { ReactChild } from 'react'
import { OverlayType } from '@atom/Overlay'
import { ModalWrapperType } from '@atom/ModalWrapper'

export { default } from './Modal'

export interface ModalProps {
  overlayStyle?: OverlayType.StyleAttributes
  modalWrapperStyle?: ModalWrapperType.StyleAttributes
  children?: ReactChild
  disableCloseButton?: boolean
  fixed?: boolean
  onClose?: () => void
}
