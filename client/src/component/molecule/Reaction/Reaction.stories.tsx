import React from 'react'
import Reaction from '.'

export default {
  title: 'Molecule/Reaction',
  component: Reaction,
}

export const reaction = () => {
  const loginUserId = 1

  const reaction1 = ':gun:'
  const reaction2 = ':heart:'

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

  const memberList1 = [user01, user02, user03]
  const memberList2 = [user02, user03]

  return (
    <>
      <Reaction
        reactionContent={reaction1}
        loginUserId={loginUserId}
        members={memberList1}
      />
      <Reaction
        reactionContent={reaction2}
        loginUserId={loginUserId}
        members={memberList2}
      />
    </>
  )
}

reaction.story = {
  name: 'Default',
}
