import React from 'react'
import A from '@atom'
import M from '@molecule'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'
// import { ReactionListProps } from '.'

import Styled from './ReactionList.style'

export interface ReactionListProps {
  reactions: ReactionType[]
  loginUserId: number
  onDeleteClick?: () => void
  onAddClick?: () => void
  onAddReactionButtonClick?: () => void
}

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
  reactions,
  loginUserId,
  onDeleteClick,
  onAddClick,
  onAddReactionButtonClick,
}: ReactionListProps) => {
  const reactionMap: Map<string, ReactionType[]> = reactions.reduce(
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
        <M.Reaction
          reactions={reactionBundle}
          loginUserId={loginUserId}
          onDeleteClick={onDeleteClick}
          onAddClick={onAddClick}
        />
      ))}
      <A.Button
        customStyle={addReactionButtonStyle}
        onClick={onAddReactionButtonClick}
      >
        <A.Icon icon={myIcon.laughEmoji} />
      </A.Button>
    </Styled.Wrapper>
  )
}

const addReactionButtonStyle: ButtonType.StyleAttributes = {
  borderRadius: '24px',
  padding: '5px 10px',
  margin: '0 0 3px 0',
  cursor: 'pointer',
  backgroundColor: 'whiteGrey',
  hoverBoxShadow: '#000000 0px 0px 0px 1px inset',
  hoverBackgroundColor: 'white',
}

export default ReactionList
