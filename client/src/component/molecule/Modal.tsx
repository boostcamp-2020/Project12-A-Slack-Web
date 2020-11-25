import React, { useState } from 'react'
import A from '@atom'
import { OverlayType } from '@atom/Overlay'
import { ModalWrapperType } from '@atom/ModalWrapper'

namespace ModalType {
  export interface Props {
    overlayStyle?: OverlayType.StyleAttributes
    modalWrapperStyle?: ModalWrapperType.StyleAttributes
    children?: React.ReactChild
    onClose?: () => void
  }
}

const Modal = ({
  overlayStyle,
  modalWrapperStyle,
  children,
  onClose,
}: ModalType.Props) => {
  const [hidden, setHidden] = useState(false)

  const onModalClose = () => {
    if (onClose) onClose()
    setHidden(true)
  }

  return (
    <div hidden={hidden}>
      <A.Overlay customStyle={overlayStyle} onClick={onModalClose} />
      <A.ModalWrapper customStyle={modalWrapperStyle}>
        {children}
      </A.ModalWrapper>
    </div>
  )
}

export default Modal
