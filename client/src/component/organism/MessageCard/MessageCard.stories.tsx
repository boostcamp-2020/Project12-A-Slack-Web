import React from 'react'
import { withKnobs, object, boolean } from '@storybook/addon-knobs'
import MessageCard from '.'

export default {
  title: 'Organism/MessageCard',
  component: MessageCard,
  decorators: [withKnobs],
}

export const messageCard = () => {
  const continuous = boolean('continuous', false)
  const data = object('data', {
    id: 1,
    createdAt: '2020-11-25T15:09:30.000Z',
    updatedAt: '2020-11-25T15:09:30.000Z',
    Messages: [
      {
        id: 1,
        content: '<strong> hello </strong>',
        isHead: true,
        createdAt: '2020-11-25T15:09:30.000Z',
        updatedAt: '2020-11-25T15:09:30.000Z',
        User: {
          id: 1,
          email: 'dlgkswn885@korea.ac.kr',
          name: '‍이한주[ 학부재학 / 산업경영공학부 ]',
          profileImageUrl:
            'https://lh6.googleusercontent.com/-N1Pn-Or52MM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7DRZcFBqsGNFc9Z5LUf8hGZRi5g/s96-c/photo.jpg',
        },
        Files: [],
        Reactions: [
          {
            id: 4,
            content: ':gun:',
          },
        ],
      },
      {
        id: 2,
        content: '<strong> hi </strong>',
        isHead: false,
        createdAt: '2020-11-25T15:09:30.000Z',
        updatedAt: '2020-11-25T15:09:30.000Z',
        User: {
          id: 2,
          email: 'ihanju95@gmail.com',
          name: '이두주',
          profileImageUrl:
            'https://lh3.googleusercontent.com/-VDkRdj9PpUo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnTBFod0S-59xYDXy2Y5oG8kAFYnA/s96-c/photo.jpg',
        },
        Files: [],
        Reactions: [],
      },
    ],
    User: {
      id: 2,
      email: 'ihanju95@gmail.com',
      name: '이두주',
      profileImageUrl:
        'https://lh3.googleusercontent.com/-VDkRdj9PpUo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnTBFod0S-59xYDXy2Y5oG8kAFYnA/s96-c/photo.jpg',
    },
  })
  return <MessageCard data={data} continuous={continuous} />
}

messageCard.story = {
  name: 'Default',
}

export const ContinuousMessageCard = () => {
  const continuous = boolean('continuous', true)
  const data = object('data', { id: 0 })
  return (
    <>
      <MessageCard data={data} />
      <MessageCard data={data} continuous={continuous} />
    </>
  )
}
