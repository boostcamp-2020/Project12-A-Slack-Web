import React, { useState, MouseEvent } from 'react'
import A from '@atom'
import O from '@organism'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
import calcModalPosition from '@util/calcModalPosition'
import { ActionBarProps } from '.'

import Styled from './ActionBar.style'

const ActionBar = ({
  targetType,
  targetId,
  targetAuthorId,
  loginUserId,
  onDeleteButtonClick,
  onEditButtonClick,
  onReplyButtonClick,
  onReactionClick,
}: ActionBarProps) => {
  const [actionsMenuVisible, setActionsMenuVisible] = useState(false)
  const [reactionPickerVisible, setReactionPickerVisible] = useState(false)

  /** reaction picker */
  const handleAddReactionButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    // TODO: useRerf로 modalWidth, modalHeight magic number 제거
    const [left, top] = calcModalPosition(380, 480, event, window)
    modalWrapperStyle.left = String(`${left}px`)
    modalWrapperStyle.top = String(`${top}px`)
    setReactionPickerVisible(true)
  }
  const handleReactionPickerClose = () => setReactionPickerVisible(false)

  /** reply subview control */
  const handleReplyButtonClick = (): void => {
    if (onReplyButtonClick) onReplyButtonClick()
  }

  /** more action menu control */
  const handleMoreActionsButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const [left, top] = calcModalPosition(270, 105, event, window)
    modalWrapperStyle.left = String(`${left}px`)
    modalWrapperStyle.top = String(`${top}px`)
    setActionsMenuVisible(true)
  }
  const handleActionsMenuClose = () => setActionsMenuVisible(false)

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
      {reactionPickerVisible && (
        <O.ReactionPicker
          modalAttributes={modalWrapperStyle}
          onReactionClick={onReactionClick}
          onClose={handleReactionPickerClose}
        />
      )}
      {actionsMenuVisible && (
        <O.MessageActionsMenu
          targetId={targetId}
          modalAttributes={modalWrapperStyle}
          onDeleteButtonClick={onDeleteButtonClick}
          onEditButtonClick={onEditButtonClick}
          onClose={handleActionsMenuClose}
        />
      )}
    </>
  )
}

ActionBar.defaultProps = {}

const buttonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  width: '30px',
  height: '28px',
  margin: '2px',
}

let modalWrapperStyle = {
  zIndex: '999',
  position: 'fixed',
  left: '0',
  top: '50%',
}

export default ActionBar
