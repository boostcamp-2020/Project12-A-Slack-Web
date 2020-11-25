import React, { useState } from 'react'
import A from '@atom'
import { OverlayType } from '@atom/Overlay'
import { ModalWrapperType } from '@atom/ModalWrapper'

namespace ModalType {
  export interface Props {
    overlayStyle?: OverlayType.StyleAttributes
    modalWrapperStyle?: ModalWrapperType.StyleAttributes
    children?: React.ReactChild
    disableCloseButton?: boolean
    onClose?: () => void
  }
}

const Modal = ({
  overlayStyle,
  modalWrapperStyle,
  children,
  disableCloseButton,
  onClose,
}: ModalType.Props) => {
  const [hidden, setHidden] = useState(false)

  const onModalClose = () => {
    if (onClose) onClose()
    setHidden(true)
  }

  // TODO: CloseButton에 Icon 적용
  const closeButton = (
    <A.Button
      customStyle={{
        position: 'absolute',
        padding: '5px',
        top: '3px',
        right: '3px',
        zIndex: '10',
        hoverBackgroungColor: 'grey',
        border: 'none',
      }}
      onClick={onModalClose}
    >
      X
    </A.Button>
  )

  return (
    <div hidden={hidden}>
      <A.Overlay customStyle={overlayStyle} onClick={onModalClose} />
      <A.ModalWrapper customStyle={modalWrapperStyle}>
        <>
          {disableCloseButton ? '' : closeButton}
          {children}
        </>
      </A.ModalWrapper>
    </div>
  )
}

export default Modal
