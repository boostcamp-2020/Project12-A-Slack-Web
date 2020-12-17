import React from 'react'
import MessageActionsMenu from '.'

export default {
  title: 'Organism/MessageActionsMenu',
  component: MessageActionsMenu,
}

export const messageActionsMenu = () => {
  const targetId = 1
  const handleDeleteButtonClick = () => {
    alert(`delete targetId: ${targetId}`)
  }
  const handleEditButtonClick = () => {
    alert(`edit targetId: ${targetId}`)
  }
  return (
    <MessageActionsMenu
      targetId={targetId}
      onDeleteButtonClick={handleDeleteButtonClick}
      onEditButtonClick={handleEditButtonClick}
    />
  )
}

export const messageActionsMenuWithModalAttributes = () => {
  const targetId = 1
  const handleDeleteButtonClick = () => {
    alert(`delete targetId: ${targetId}`)
  }
  const handleEditButtonClick = () => {
    alert(`edit targetId: ${targetId}`)
  }
  return (
    <MessageActionsMenu
      targetId={targetId}
      modalAttributes={{ position: 'absolute', top: '10px', left: '100px' }}
      onDeleteButtonClick={handleDeleteButtonClick}
      onEditButtonClick={handleEditButtonClick}
    />
  )
}
