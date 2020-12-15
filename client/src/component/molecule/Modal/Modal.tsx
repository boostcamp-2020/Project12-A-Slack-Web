import React, { useState } from 'react'
import A from '@atom'
import myIcon from '@constant/icon'
import Icon from '@atom/Icon'
import { ModalProps } from '.'

const Modal = ({
  overlayStyle,
  modalWrapperStyle,
  children,
  disableCloseButton,
  fixed,
  onClose,
}: ModalProps) => {
  const [hidden, setHidden] = useState(false)

  const handleModalClose = (): void => {
    setHidden(true)
    if (onClose) onClose()
  }

  const modalBaseStyle: React.CSSProperties = {
    position: fixed ? 'fixed' : 'inherit',
    zIndex: 100,
  }

  const closeButton = (
    <A.Button
      customStyle={{
        position: 'absolute',
        padding: '8px 11px',
        top: '5px',
        right: '5px',
        zIndex: '10',
        hoverBackgroundColor: 'greyHover',
        border: 'none',
      }}
      onClick={handleModalClose}
    >
      <Icon icon={myIcon.close} />
    </A.Button>
  )

  return (
    <div hidden={hidden} style={modalBaseStyle}>
      <A.Overlay customStyle={overlayStyle} onClick={handleModalClose} />
      <A.ModalWrapper customStyle={modalWrapperStyle}>
        <>
          {disableCloseButton ? '' : closeButton}
          {children}
        </>
      </A.ModalWrapper>
    </div>
  )
}

Modal.defaultProps = {}

export default Modal
