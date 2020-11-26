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
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddReactionButtonClick = (): void => {
    alert(`Open Reaction Select Modal, targetId=${targetId}`)
  }
  const handleReplyButtonClick = (): void => {
    alert(`Open Thread Detail, targetId=${targetId}`)
  }
  const handleMoreActionsButtonClick = () => setModalVisible(true)
  const handleModalClose = () => setModalVisible(false)

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
      {modalVisible && (
        <O.MessageActionsMenu
          targetId={targetId}
          modalAttributes={{ position: 'absolute', left: '105%', top: '0' }}
          onDeleteButtonClick={onDeleteButtonClick}
          onEditButtonClick={onEditButtonClick}
          onClose={handleModalClose}
        />
      )}
    </Styled.Container>
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
