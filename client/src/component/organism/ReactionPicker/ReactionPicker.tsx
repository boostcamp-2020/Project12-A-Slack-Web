import React from 'react'
import M from '@molecule'
import { ModalWrapperType } from '@atom/ModalWrapper'
import Picker, { IEmojiData } from 'emoji-picker-react'
import { ReactionPickerProps } from '.'

const ReactionPicker = ({
  targetId,
  modalAttributes,
  onReactionClick,
  onClose,
}: ReactionPickerProps) => {
  const handleReactionClick = (event: MouseEvent, emojiObject: IEmojiData) => {
    console.log(emojiObject)
  }

  return (
    <M.Modal
      modalWrapperStyle={{ ...modalWrapperStyle, ...modalAttributes }}
      disableCloseButton
      onClose={onClose}
    >
      <Picker onEmojiClick={handleReactionClick} />
    </M.Modal>
  )
}

const modalWrapperStyle: ModalWrapperType.StyleAttributes = {
  padding: '0',
  backgroundColor: 'white',
  border: '0.5px solid lightGrey',
  borderRadius: '6px',
}

export default ReactionPicker
