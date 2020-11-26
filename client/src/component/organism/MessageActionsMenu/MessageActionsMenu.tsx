import React from 'react'
import M from '@molecule'
import { ModalWrapperType } from '@atom/ModalWrapper'
import { MessageActionsMenuProps } from '.'

const MessageActionsMenu = ({
  targetId,
  modalAttributes,
  onDeleteButtonClick,
  onEditButtonClick,
}: MessageActionsMenuProps) => {
  return (
    <M.Modal
      modalWrapperStyle={{ ...modalWrapperStyle, ...modalAttributes }}
      disableCloseButton
    >
      <>
        <M.ActionMenuButton type="PLAIN" onClick={onEditButtonClick}>
          Edit message
        </M.ActionMenuButton>

        <M.ActionMenuButton type="WARN" onClick={onDeleteButtonClick}>
          Delete message
        </M.ActionMenuButton>
      </>
    </M.Modal>
  )
}

const modalWrapperStyle: ModalWrapperType.StyleAttributes = {
  width: '250px',
  padding: '0.5rem 0',
  backgroundColor: 'whiteGrey',
  border: '1px solid lightGrey',
  borderRadius: '6px',
}

export default MessageActionsMenu
