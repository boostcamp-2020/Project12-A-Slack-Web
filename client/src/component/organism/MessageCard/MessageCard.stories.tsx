import React from 'react'
import MessageCard from '.'

export default {
  title: 'Organism/MessageCard',
  component: MessageCard,
}

export const messageCard = () => {
  return <MessageCard data={{}} />
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
