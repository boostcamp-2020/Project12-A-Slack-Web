import React from 'react'
import ActionBar from '.'

export default {
  title: 'Organism/ActionBar',
  component: ActionBar,
}

export const actionBar = () => {
  const targetTypeThread = 'THREAD'
  const targetTypeMessage = 'MESSAGE'
  const targetId = 1
  const targetAuthorId = 1
  const loginUserId = 1

  const handleDeleteButtonClick = () => {
    alert(`Delete message [messageId: ${targetId}]`)
  }
  const handleEditButtonClick = () => {
    alert(`Edit message [messageId: ${targetId}]`)
  }

  return (
    <>
      <div>targetAuthorId === loginUserId</div>
      <ActionBar
        targetType={targetTypeThread}
        targetId={targetId}
        targetAuthorId={targetAuthorId}
        loginUserId={loginUserId}
        onDeleteButtonClick={handleDeleteButtonClick}
        onEditButtonClick={handleEditButtonClick}
      />
      <hr />
      <div>targetAuthorId === loginUserId & targetType is MESSAGE </div>
      <ActionBar
        targetType={targetTypeMessage}
        targetId={targetId}
        targetAuthorId={targetAuthorId}
        loginUserId={loginUserId}
        onDeleteButtonClick={handleDeleteButtonClick}
        onEditButtonClick={handleEditButtonClick}
      />
      <hr />
      <div>targetAuthorId !== loginUserId</div>
      <ActionBar
        targetType={targetTypeThread}
        targetId={targetId}
        targetAuthorId={targetAuthorId + 1}
        loginUserId={loginUserId}
        onDeleteButtonClick={handleDeleteButtonClick}
        onEditButtonClick={handleEditButtonClick}
      />
      <hr />
      <div>targetAuthorId !== loginUserId & targetType is MESSAGE </div>
      <ActionBar
        targetType={targetTypeMessage}
        targetId={targetId}
        targetAuthorId={targetAuthorId + 1}
        loginUserId={loginUserId}
        onDeleteButtonClick={handleDeleteButtonClick}
        onEditButtonClick={handleEditButtonClick}
      />
    </>
  )
}

actionBar.story = {
  name: 'Default',
}
