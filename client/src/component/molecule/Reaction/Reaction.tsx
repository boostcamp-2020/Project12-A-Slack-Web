import React from 'react'
import A from '@atom'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { Emoji } from 'emoji-mart'
import { ReactionProps } from '.'

const Reaction = ({
  reactions,
  loginUserId,
  onDeleteClick,
  onAddClick,
}: ReactionProps) => {
  const emoji = reactions[0]?.content
  const reacted =
    reactions.filter((reaction) => reaction.User.id === loginUserId).length ===
    1

  const switchButtonStyle: ButtonType.StyleAttributes = reacted
    ? reactedButtonStyle
    : unreactedButtonStyle

  const handleReactionClick = reacted ? onDeleteClick : onAddClick

  return (
    <A.Button
      customStyle={{
        ...defaultButtonStyle,
        ...switchButtonStyle,
      }}
      onClick={handleReactionClick}
    >
      <>
        <Emoji emoji={emoji} size={16} />
        <A.Text customStyle={textStyle}>{reactions.length}</A.Text>
      </>
    </A.Button>
  )
}

const defaultButtonStyle: ButtonType.StyleAttributes = {
  borderRadius: '24px',
  padding: '5px 8px',
  margin: '0 3px 3px 0',
  cursor: 'pointer',
}

const reactedButtonStyle: ButtonType.StyleAttributes = {
  boxShadow: '#298EFF 0px 0px 0px 1.5px inset',
  backgroundColor: 'aliceBlue',
}

const unreactedButtonStyle: ButtonType.StyleAttributes = {
  backgroundColor: 'whiteGrey',
  hoverBoxShadow: '#000000 0px 0px 0px 1px inset',
  hoverBackgroundColor: 'white',
}

const textStyle: TextType.StyleAttributes = {
  fontSize: '1.2rem',
  margin: '0 0 0 7px',
}

export default Reaction
