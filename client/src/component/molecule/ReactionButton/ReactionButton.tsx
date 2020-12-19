import React, { useState, useRef } from 'react'
import A from '@atom'
import M from '@molecule'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { Emoji } from 'emoji-mart'
import { ReactionButtonProps } from '.'
import Styled from './ReactionButton.style'

const ReactionButton = ({
  reactionBundle,
  loginUserId,
  onReactionClick,
}: ReactionButtonProps) => {
  const [hover, setHover] = useState<boolean>(false)
  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  const emoji = reactionBundle[0]?.content
  const reacted = !!reactionBundle.find(
    (reaction) => reaction.User.id === loginUserId,
  )

  const switchButtonStyle: ButtonType.StyleAttributes = reacted
    ? reactedButtonStyle
    : unreactedButtonStyle

  const handleReactionClick = () => {
    onReactionClick(emoji)
  }

  const reactionEl = useRef<HTMLDivElement>(null)

  const tooltipContent = (
    <Styled.TooltipContent>
      <Emoji emoji={emoji} size={25} />
      <A.Text customStyle={tooltipNameTextStyle}>
        {reactionBundle
          .reduce((prev, reaction) => `${prev + reaction.User.name}, `, '')
          .slice(0, -2)}
      </A.Text>
      <A.Text customStyle={tooltipDescTextStyle}>
        {`reacted with ${emoji}`}
      </A.Text>
    </Styled.TooltipContent>
  )

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={reactionEl}
      >
        <A.Button
          customStyle={{
            ...defaultButtonStyle,
            ...switchButtonStyle,
          }}
          onClick={handleReactionClick}
        >
          <>
            <Emoji emoji={emoji} size={16} />
            <A.Text customStyle={textStyle}>{reactionBundle.length}</A.Text>
          </>
        </A.Button>
      </div>
      {hover && <M.Tooltip parent={reactionEl} content={tooltipContent} />}
    </>
  )
}

const defaultButtonStyle: ButtonType.StyleAttributes = {
  borderRadius: '24px',
  padding: '5px 8px',
  margin: '0 4px 3px 0',
  cursor: 'pointer',
}

const reactedButtonStyle: ButtonType.StyleAttributes = {
  boxShadow: '#298EFF 0px 0px 0px 1.5px inset',
  backgroundColor: 'aliceBlue',
}

const unreactedButtonStyle: ButtonType.StyleAttributes = {
  backgroundColor: 'reactionGrey',
  hoverBoxShadow: '#717171 0px 0px 0px 1px inset',
  hoverBackgroundColor: 'white',
}

const textStyle: TextType.StyleAttributes = {
  fontSize: '1.2rem',
  margin: '0 0 0 7px',
}

const tooltipNameTextStyle: TextType.StyleAttributes = {
  fontSize: '1.3rem',
  fontWeight: '600',
  color: 'white',
  margin: '5px 0 0 0',
}

const tooltipDescTextStyle: TextType.StyleAttributes = {
  fontSize: '1.3rem',
  fontWeight: '600',
  color: 'darkGrey',
  margin: '3px 0 0 0',
}

export default ReactionButton
