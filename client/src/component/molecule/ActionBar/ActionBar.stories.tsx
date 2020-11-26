import React from 'react'
import ActionBar from '.'

export default {
  title: 'Molecule/ActioinBar',
  component: ActionBar,
}

export const actionBar = () => {
  const targetTypeThread = 'THREAD'
  const targetTypeMessage = 'MESSAGE'
  const targetId = 1
  const targetAuthorId = 1
  const loginUserId = 1
  return (
    <>
      <div>targetAuthorId === loginUserId</div>
      <ActionBar
        targetType={targetTypeThread}
        targetId={targetId}
        targetAuthorId={targetAuthorId}
        loginUserId={loginUserId}
      />
      <hr />
      <div>targetAuthorId === loginUserId & targetType is MESSAGE </div>
      <ActionBar
        targetType={targetTypeMessage}
        targetId={targetId}
        targetAuthorId={targetAuthorId}
        loginUserId={loginUserId}
      />
      <hr />
      <div>targetAuthorId !== loginUserId</div>
      <ActionBar
        targetType={targetTypeThread}
        targetId={targetId}
        targetAuthorId={targetAuthorId + 1}
        loginUserId={loginUserId}
      />
      <hr />
      <div>targetAuthorId !== loginUserId & targetType is MESSAGE </div>
      <ActionBar
        targetType={targetTypeMessage}
        targetId={targetId}
        targetAuthorId={targetAuthorId + 1}
        loginUserId={loginUserId}
      />
    </>
  )
}

actionBar.story = {
  name: 'Default',
}
