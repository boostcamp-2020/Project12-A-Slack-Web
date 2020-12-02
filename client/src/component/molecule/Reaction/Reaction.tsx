import React from 'react'
import A from '@atom'
import { ButtonType } from '@atom/Button'
import { Emoji } from 'emoji-mart'
import { ReactionProps } from '.'

const Reaction = ({
  reactionContent,
  members,
  loginUserId,
  onDeleteClick,
  onAddClick,
}: ReactionProps) => {
  const reacted = members.filter((user) => user.id === loginUserId).length === 1

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
        <Emoji emoji={reactionContent} size={16} />
        <A.Text customStyle={{ fontSize: '1.2rem', margin: '0 0 0 7px' }}>
          {members.length}
        </A.Text>
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

export default Reaction
