import React from 'react'
import { withKnobs, object, boolean } from '@storybook/addon-knobs'
import { GetThreadResponseType } from '@type/thread.type'
import MessageCard from '.'

export default {
  title: 'Organism/MessageCard',
  component: MessageCard,
  decorators: [withKnobs],
}

const reaction1 = ':gun:'
const reaction2 = ':heart:'
const reaction3 = ':clap:'

const user01 = {
  id: 1,
  email: 'user01@naver.com',
  name: '‍유저1',
  profileImageUrl: 'http://placehold.it/100',
}
const user02 = {
  id: 2,
  email: 'user02@naver.com',
  name: '‍유저22',
  profileImageUrl: 'http://placehold.it/100',
}
const user03 = {
  id: 3,
  email: 'user03@naver.com',
  name: '‍3번 유저',
  profileImageUrl: 'http://placehold.it/100',
}

const reactions = [
  {
    id: 1,
    content: reaction1,
    User: user01,
  },
  {
    id: 2,
    content: reaction1,
    User: user02,
  },
  {
    id: 4,
    content: reaction2,
    User: user03,
  },
  {
    id: 6,
    content: reaction3,
    User: user01,
  },
  {
    id: 5,
    content: reaction2,
    User: user02,
  },
  {
    id: 3,
    content: reaction1,
    User: user03,
  },
]

// export interface GetThreadResponseType {
//   id: number
//   createdAt: string
//   updatedAt: string
//   channelId: number
//   User: UserType
//   headMessage: MessageType
//   replyCount: number
//   userProfileMax5: string[]
//   commenterCount: number
//   lastReplyTime: string
// }

// export interface MessageType {
//   id: number
//   content: string
//   isHead?: false
//   createdAt: string
//   updatedAt: string
//   userId?: number
//   threadId?: number
//   User: UserType
//   File: FileType[]
//   Reactions: ReactionType[]
// }

// interface ReactionType {
//   id: number
//   content: string
//   createdAt?: string
//   updatedAt?: string
//   messageId?: number
//   userId?: number
//   User: UserType
// }

export const messageCard = () => {
  const continuous = boolean('continuous', false)
  const data = object('data', {
    id: 1,
    createdAt: '2020-11-25T15:09:30.000Z',
    updatedAt: '2020-11-25T15:09:30.000Z',
    channelId: 1,
    User: user01,
    headMessage: {
      id: 1,
      content: 'MessageCard 입니다.',
      isHead: true,
      createdAt: '2020-11-25T15:09:30.000Z',
      updatedAt: '2020-11-28T15:09:30.000Z',
      userId: user01.id,
      threadId: 1,
      User: user01,
      File: [],
      Reactions: reactions,
    },
    replyCount: 3,
    userProfileMax5: [
      user01.profileImageUrl,
      user02.profileImageUrl,
      user03.profileImageUrl,
    ],
    commenterCount: 3,
    lastReplyTime: '2020-11-26T15:09:30.000Z',
  })
  return (
    <MessageCard
      type="THREAD"
      data={data as GetThreadResponseType}
      continuous={continuous}
      onReplyButtonClick={() => console.log('Reply button Clicked')}
    />
  )
}

messageCard.story = {
  name: 'Default',
}

// export const ContinuousMessageCard = () => {
//   const continuous = boolean('continuous', true)
//   const noReplyData = object('first data', {
//     id: 1,
//     createdAt: '2020-11-25T15:09:30.000Z',
//     updatedAt: '2020-11-25T15:09:30.000Z',
//     Messages: [
//       {
//         id: 1,
//         content:
//           'Continuous example (No Reply) continuous는 reply 여부 또한 고려해서 정해져야 한다.',
//         isHead: true,
//         createdAt: '2020-11-25T15:09:30.000Z',
//         updatedAt: '2020-11-25T15:09:30.000Z',
//         User: user01,
//         Files: [],
//         Reactions: reactions,
//       },
//     ],
//     User: user01,
//   })
//   const data = object('second data', {
//     id: 1,
//     createdAt: '2020-11-25T15:09:30.000Z',
//     updatedAt: '2020-11-25T15:09:30.000Z',
//     Messages: [
//       {
//         id: 1,
//         content: 'Continuous example ',
//         isHead: true,
//         createdAt: '2020-11-25T15:09:30.000Z',
//         updatedAt: '2020-11-25T15:09:30.000Z',
//         User: user01,
//         Files: [],
//         Reactions: [],
//       },
//       {
//         id: 2,
//         content: 'Continuous example 2',
//         isHead: true,
//         createdAt: '2020-11-25T15:09:30.000Z',
//         updatedAt: '2020-11-25T15:09:30.000Z',
//         User: user01,
//         Files: [],
//         Reactions: [
//           {
//             id: 4,
//             content: ':gun:',
//             User: user03,
//           },
//         ],
//       },
//     ],
//     User: user01,
//   })
//   return (
//     <>
//       <MessageCard
//         type="THREAD"
//         data={noReplyData}
//         onReplyButtonClick={() => console.log('Reply button Clicked')}
//       />
//       <MessageCard
//         type="THREAD"
//         data={data}
//         continuous={continuous}
//         onReplyButtonClick={() => console.log('Reply button Clicked')}
//       />
//     </>
//   )
// }

// export const NoReplyMessageCard = () => {
//   const continuous = boolean('continuous', false)
//   const data = object('data', {
//     id: 1,
//     createdAt: '2020-11-25T15:09:30.000Z',
//     updatedAt: '2020-11-25T15:09:30.000Z',
//     Messages: [
//       {
//         id: 1,
//         content: 'No Reply example',
//         isHead: true,
//         createdAt: '2020-11-25T15:09:30.000Z',
//         updatedAt: '2020-11-25T15:09:30.000Z',
//         User: user03,
//         Files: [],
//         Reactions: reactions,
//       },
//     ],
//     User: user03,
//   })
//   return (
//     <>
//       <MessageCard
//         type="THREAD"
//         data={data}
//         continuous={continuous}
//         onReplyButtonClick={() => console.log('Reply button Clicked')}
//       />
//     </>
//   )
// }

// export const NoHeadMessageCard = () => {
//   const continuous = boolean('continuous', false)
//   const data = object('data', {
//     id: 1,
//     createdAt: '2020-11-25T15:09:30.000Z',
//     updatedAt: '2020-11-25T15:09:30.000Z',
//     Messages: [
//       {
//         id: 1,
//         content: 'No Head example',
//         isHead: false,
//         createdAt: '2020-11-25T15:09:30.000Z',
//         updatedAt: '2020-11-25T15:09:30.000Z',
//         User: user02,
//         Files: [],
//         Reactions: reactions,
//       },
//     ],
//     User: user02,
//   })
//   return (
//     <>
//       <MessageCard
//         type="THREAD"
//         data={data}
//         continuous={continuous}
//         onReplyButtonClick={() => console.log('Reply button Clicked')}
//       />
//     </>
//   )
// }
