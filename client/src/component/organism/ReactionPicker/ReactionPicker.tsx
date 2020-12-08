import React from 'react'
import M from '@molecule'
import { ModalWrapperType } from '@atom/ModalWrapper'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, EmojiData } from 'emoji-mart'

import { ReactionPickerProps } from '.'

const ReactionPicker = ({
  targetId,
  modalAttributes,
  onReactionClick,
  onClose,
}: ReactionPickerProps) => {
  const handleEmojiSelect = (emoji: EmojiData) => {
    const { colons } = emoji
    console.log(colons)
    if (colons) onReactionClick(colons)
  }

  return (
    <M.Modal
      modalWrapperStyle={{ ...modalWrapperStyle, ...modalAttributes }}
      disableCloseButton
      onClose={onClose}
    >
      <Picker onSelect={handleEmojiSelect} />
    </M.Modal>
  )
}

const modalWrapperStyle: ModalWrapperType.StyleAttributes = {
  padding: '0',
  borderRadius: '6px',
}

export default ReactionPicker
