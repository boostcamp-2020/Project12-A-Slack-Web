import React from 'react'
import ReplyButton from '.'

export default {
  title: 'Organism/ReplyButton',
  component: ReplyButton,
}

export const replyButton = () => {
  return <ReplyButton count={3} time="2020-11-24 18:29:37" />
}

replyButton.story = {
  name: 'Default',
}
