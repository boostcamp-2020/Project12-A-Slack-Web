import React from 'react'
import MessageEditor from '.'

export default {
  title: 'Organism/MessageEditor',
  component: MessageEditor,
}

export const messageEditor = () => {
  return <MessageEditor id={1} />
}

messageEditor.story = {
  name: 'Default',
}
