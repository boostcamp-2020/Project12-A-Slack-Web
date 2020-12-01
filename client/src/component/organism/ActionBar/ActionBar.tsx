import React, { useState } from 'react'
import A from '@atom'
import O from '@organism'
import myIcon from '@constant/icon'
import { ButtonType } from '@atom/Button'
import { ActionBarProps } from '.'

import Styled from './ActionBar.style'

const ActionBar = ({
  targetType,
  targetId,
  targetAuthorId,
  loginUserId,
  onDeleteButtonClick,
  onEditButtonClick,
}: ActionBarProps) => {
  const [actionsMenuVisible, setActionsMenuVisible] = useState(false)
  const [reactionPickerVisible, setReactionPickerVisible] = useState(false)

  const handleAddReactionButtonClick = () => setReactionPickerVisible(true)
  const handleReactionPickerClose = () => setReactionPickerVisible(false)

  const handleReplyButtonClick = (): void => {
    alert(`Open Thread Detail, targetId=${targetId}`)
  }

  const handleMoreActionsButtonClick = () => setActionsMenuVisible(true)
  const handleActionsMenuClose = () => setActionsMenuVisible(false)

  return (
    <Styled.Container>
      <Styled.ButtonWrapper>
        <A.Button
          onClick={handleAddReactionButtonClick}
          customStyle={buttonStyle}
        >
          <A.Icon icon={myIcon.laughEmoji} />
        </A.Button>
        {targetType === 'THREAD' && (
          <A.Button onClick={handleReplyButtonClick} customStyle={buttonStyle}>
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
      {actionsMenuVisible && (
        <O.MessageActionsMenu
          targetId={targetId}
          modalAttributes={{ position: 'absolute', left: '105%', top: '0' }}
          onDeleteButtonClick={onDeleteButtonClick}
          onEditButtonClick={onEditButtonClick}
          onClose={handleActionsMenuClose}
        />
      )}
      {reactionPickerVisible && (
        <O.ReactionPicker
          targetId={targetId}
          modalAttributes={{ position: 'absolute', left: '0', top: '105%' }}
          onClose={handleReactionPickerClose}
        />
      )}
    </Styled.Container>
  )
}

ActionBar.defaultProps = {}

const buttonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  width: '30px',
  height: '28px',
  margin: '2px',
}

export default ActionBar
