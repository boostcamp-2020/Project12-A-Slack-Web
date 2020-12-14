import React from 'react'
import ActionMenuButton from '.'

export default {
  title: 'Molecule/ActionMenuButton',
  component: ActionMenuButton,
}

export const actionMenuButton = () => {
  return (
    <>
      <div>Plain button :</div>
      <ActionMenuButton type="PLAIN" onClick={() => alert('on button click')}>
        Edit Button
      </ActionMenuButton>

      <hr />

      <div>Warn button :</div>
      <ActionMenuButton type="WARN" onClick={() => alert('on button click')}>
        Delete Button
      </ActionMenuButton>
    </>
  )
}

actionMenuButton.story = {
  name: 'Default',
}
