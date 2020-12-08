import React from 'react'
import ReactionPicker from '.'

export default {
  title: 'Organism/ReactionPicker',
  component: ReactionPicker,
}

export const reactionPicker = () => {
  const targetId = 1

  return (
    <ReactionPicker
      targetId={targetId}
      onReactionClick={(emoji: string) => console.log(emoji)}
    />
  )
}
