import React, { useState, MouseEvent } from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
import calcModalPosition from '@util/calcModalPosition'
import { ReactionListProps } from '.'

import Styled from './ReactionList.style'

interface ReactionType {
  id: number
  content: string
  User: UserType
}

interface UserType {
  id: number
  email: string
  name: string
  profileImageUrl: string
}

const ReactionList = ({
  reactionArr,
  loginUserId,
  onReactionClick,
}: ReactionListProps) => {
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

  const reactionMap: Map<string, ReactionType[]> = reactionArr.reduce(
    (prev, cur) => {
      const reContent = cur.content
      const array = prev.get(reContent)
      if (array) array.push(cur)
      else prev.set(reContent, [cur])
      return prev
    },
    new Map(),
  )

  const reactionBundleList: ReactionType[][] = []
  reactionMap.forEach((reBundle) => reactionBundleList.push(reBundle))

  return (
    <Styled.Wrapper>
      {reactionBundleList.map((reactionBundle) => (
        <M.ReactionButton
          reactionBundle={reactionBundle}
          loginUserId={loginUserId}
          onReactionClick={onReactionClick}
          key={reactionBundle[0].content}
        />
      ))}
      <A.Button
        customStyle={addReactionButtonStyle}
        onClick={handleAddReactionButtonClick}
      >
        <A.Icon icon={myIcon.laughEmoji} />
      </A.Button>
      {reactionPickerVisible && (
        <O.ReactionPicker
          modalAttributes={modalWrapperStyle}
          onReactionClick={onReactionClick}
          onClose={handleReactionPickerClose}
        />
      )}
    </Styled.Wrapper>
  )
}

const addReactionButtonStyle: ButtonType.StyleAttributes = {
  borderRadius: '24px',
  padding: '5px 10px',
  margin: '0 0 3px 0',
  cursor: 'pointer',
  backgroundColor: 'reactionGrey',
  hoverBoxShadow: '#585858 0px 0px 0px 1px inset',
  hoverBackgroundColor: 'white',
}

let modalWrapperStyle = {
  zIndex: '999',
  position: 'fixed',
  left: '0',
  top: '50%',
}

export default ReactionList
