import React from 'react'
import { withKnobs, object, boolean, number } from '@storybook/addon-knobs'
import MessageCard from '.'

export default {
  title: 'Organism/MessageCard',
  component: MessageCard,
  decorators: [withKnobs],
}

export const messageCard = () => {
  const continuous = boolean('continuous', false)
  const data = object('data', { id: 0 })
  return <MessageCard data={data} continuous={continuous} />
}

messageCard.story = {
  name: 'Default',
}

export const ContinuousMessageCard = () => {
  return (
    <>
      <MessageCard data={{}} />
      <MessageCard data={{}} continuous />
    </>
  )
}
