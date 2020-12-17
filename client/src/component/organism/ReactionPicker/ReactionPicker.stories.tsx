import React from 'react'
import ReactionPicker from '.'

export default {
  title: 'Organism/ReactionPicker',
  component: ReactionPicker,
}

export const reactionPicker = () => {
  return (
    <ReactionPicker onReactionClick={(emoji: string) => console.log(emoji)} />
  )
}
