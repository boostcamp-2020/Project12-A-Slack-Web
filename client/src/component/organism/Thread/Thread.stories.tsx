import React from 'react'
import Thread from '.'

export default {
  title: 'Organism/Thread',
  component: Thread,
}

export const thread = () => {
  return <Thread />
}

thread.story = {
  name: 'Default',
}

export const styledThread = () => {
  return <Thread />
}
