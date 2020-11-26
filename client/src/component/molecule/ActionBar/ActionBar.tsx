import React from 'react'
import A from '@atom'
import myIcon from '@constant/icon'
import { ButtonType } from '@atom/Button'
import { ActionBarProps } from '.'

import Styled from './ActionBar.style'

const ActionBar = ({
  targetType,
  targetId,
  targetAuthorId,
  loginUserId,
  onReactionClick,
  onReplyButtonClick,
  onMoreActionsButtonClick,
}: ActionBarProps) => {
  const handleAddReactionButtonClick = (): void => {
    alert(`Open Reaction Select Modal, targetId=${targetId}`)
  }
  const handleReplyButtonClick = (): void => {
    alert(`Open Thread Detail, targetId=${targetId}`)
  }
  const handleMoreActionsButtonClick = (): void => {
    alert(`Open Menu Modal, targetId=${targetId}`)
  }

  return (
    <>
      <Styled.Container>
        <Styled.ButtonWrapper>
          <A.Button
            onClick={handleAddReactionButtonClick}
            customStyle={buttonStyle}
          >
            <A.Icon icon={myIcon.laughEmoji} />
          </A.Button>
          {targetType === 'THREAD' && (
            <A.Button
              onClick={handleReplyButtonClick}
              customStyle={buttonStyle}
            >
              <A.Icon icon={myIcon.comment} />
            </A.Button>
          )}
          {targetAuthorId === loginUserId && (
            <A.Button
              onClick={handleMoreActionsButtonClick}
              customStyle={buttonStyle}
            >
              <A.Icon icon={myIcon.ellipsis} />
            </A.Button>
          )}
        </Styled.ButtonWrapper>
      </Styled.Container>
    </>
  )
}

ActionBar.defaultProps = {}

const buttonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  width: '2rem',
  height: '1.9rem',
  margin: '2px',
}

export default ActionBar
