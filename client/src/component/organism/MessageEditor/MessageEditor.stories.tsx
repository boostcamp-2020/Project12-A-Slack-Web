import React from 'react'
import MessageEditor from '.'

export default {
  title: 'Organism/MessageEditor',
  component: MessageEditor,
}

export const messageEditor = () => {
  return <MessageEditor placeHolder="Jot something down" />
}

messageEditor.story = {
  name: 'Default',
}

export const editMessageEditor = () => {
  return <MessageEditor id={1} value="<p><strong>hello</strong> world </p>" />
}

export const replyMessageEditor = () => {
  return <MessageEditor placeHolder="Reply..." />
}
