import React from 'react'
import ReplyButton from '.'

export default {
  title: 'Organism/ReplyButton',
  component: ReplyButton,
}

export const replyButton = () => {
  return <ReplyButton />
}

replyButton.story = {
  name: 'Default',
}
