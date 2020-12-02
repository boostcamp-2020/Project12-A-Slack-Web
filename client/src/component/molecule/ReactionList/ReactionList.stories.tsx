import React from 'react'
import ReactionList from '.'

export default {
  title: 'Molecule/ReactionList',
  component: ReactionList,
}

export const reactionList = () => {
  const loginUserId = 1

  const reaction1 = ':gun:'
  const reaction2 = ':heart:'
  const reaction3 = ':clap:'

  const user01 = {
    id: 1,
    email: 'user01@naver.com',
    name: '‍유저1',
    profileImageUrl: 'http://placehold.it/100',
  }
  const user02 = {
    id: 2,
    email: 'user02@naver.com',
    name: '‍유저22',
    profileImageUrl: 'http://placehold.it/100',
  }
  const user03 = {
    id: 3,
    email: 'user03@naver.com',
    name: '‍3번 유저',
    profileImageUrl: 'http://placehold.it/100',
  }

  const reactions = [
    {
      id: 1,
      content: reaction1,
      User: user01,
    },
    {
      id: 2,
      content: reaction1,
      User: user02,
    },
    {
      id: 4,
      content: reaction2,
      User: user03,
    },
    {
      id: 6,
      content: reaction3,
      User: user01,
    },
    {
      id: 5,
      content: reaction2,
      User: user02,
    },
    {
      id: 3,
      content: reaction1,
      User: user03,
    },
  ]

  return (
    <ReactionList
      reactions={reactions}
      loginUserId={loginUserId}
      onAddClick={() => alert('add reaction')}
      onDeleteClick={() => alert('delete reaction')}
      onAddReactionButtonClick={() => alert('open reaction picker')}
    />
  )
}

reactionList.story = {
  name: 'Default',
}
