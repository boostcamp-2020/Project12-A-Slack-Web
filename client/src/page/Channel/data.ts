const user01 = {
  id: 1,
  email: 'user01@naver.com',
  name: '‍유저1',
  profileImageUrl:
    'https://lh6.googleusercontent.com/-N1Pn-Or52MM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7DRZcFBqsGNFc9Z5LUf8hGZRi5g/s96-c/photo.jpg',
}
const user02 = {
  id: 2,
  email: 'user02@naver.com',
  name: '‍유저22',
  profileImageUrl:
    'https://lh3.googleusercontent.com/-VDkRdj9PpUo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnTBFod0S-59xYDXy2Y5oG8kAFYnA/s96-c/photo.jpg',
}
const user03 = {
  id: 3,
  email: 'user03@naver.com',
  name: '‍3번 유저',
  profileImageUrl:
    'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
}

const channelInfo = {
  id: 1,
  type: 'PUBLIC',
  name: 'slack-clone',
  createdAt: '2020-11-25T15:09:30.000Z',
  updatedAt: '2020-11-25T15:09:30.000Z',
  Threads: [
    {
      id: 1,
      createdAt: '2020-11-25T15:09:30.000Z',
      updatedAt: '2020-11-25T15:09:30.000Z',
      Messages: [
        {
          id: 1,
          content: '첫번째 스레드',
          isHead: true,
          createdAt: '2020-11-25T15:09:30.000Z',
          updatedAt: '2020-11-25T15:09:30.000Z',
          User: user01,
          Files: [],
          Reactions: [
            {
              id: 4,
              content: ':gun:',
              User: user01,
            },
          ],
        },
        {
          id: 2,
          content: '첫번째 스레드의 댓글',
          isHead: false,
          createdAt: '2020-11-25T15:09:30.000Z',
          updatedAt: '2020-11-25T15:09:30.000Z',
          User: user02,
          Files: [],
          Reactions: [],
        },
      ],
      User: user02,
    },
    {
      id: 2,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 2,
          content: '두번째 스레드',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user01,
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
    {
      id: 3,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '세번째 스레드',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user01,
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
    {
      id: 4,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '네번째 스레드',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user01,
          Files: [],
          Reactions: [],
        },
        {
          id: 2,
          content: '네번째 스레드의 댓글',
          isHead: false,
          createdAt: '2020-11-25T15:09:30.000Z',
          updatedAt: '2020-11-25T15:09:30.000Z',
          User: user02,
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
    {
      id: 5,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '다섯번째 스레드',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user01,
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
    /// / Thread 추가 데이터
    {
      id: 6,
      createdAt: '2020-11-25T15:09:30.000Z',
      updatedAt: '2020-11-25T15:09:30.000Z',
      Messages: [
        {
          id: 1,
          content: 'MessageCard 입니다.',
          isHead: true,
          createdAt: '2020-11-25T15:09:30.000Z',
          updatedAt: '2020-11-28T15:09:30.000Z',
          User: user01,
          Files: [],
          Reactions: [
            {
              id: 4,
              content: ':gun:',
              User: user01,
            },
          ],
        },
        {
          id: 2,
          content: '<strong> hi </strong>',
          isHead: false,
          createdAt: '2020-11-25T15:09:30.000Z',
          updatedAt: '2020-11-26T15:09:30.000Z',
          User: user02,
          Files: [],
          Reactions: [],
        },
        {
          id: 3,
          content: '<strong> hello </strong>',
          isHead: true,
          createdAt: '2020-11-25T15:09:30.000Z',
          updatedAt: '2020-11-26T20:07:00.000Z',
          User: user01,
          Files: [],
          Reactions: [
            {
              id: 4,
              content: ':gun:',
              User: user01,
            },
          ],
        },
      ],
      User: user02,
    },
    {
      id: 7,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '이름 중복 가능?',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: {
            id: 1,
            email: 'dlgkswn885@korea.ac.kr',
            name: '‍이한주[ 학부재학 / 산업경영공학부 ]',
            profileImageUrl:
              'https://lh6.googleusercontent.com/-N1Pn-Or52MM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7DRZcFBqsGNFc9Z5LUf8hGZRi5g/s96-c/photo.jpg',
          },
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
    {
      id: 8,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '5번째 스레드',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user01,
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
    {
      id: 9,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '여섯번째 스레드 내용입니다',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user02,
          Files: [],
          Reactions: [],
        },
      ],
      User: user02,
    },
    {
      id: 10,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '이름 중복 가능?',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user01,
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
    {
      id: 11,
      createdAt: '2020-11-26T11:25:44.000Z',
      updatedAt: '2020-11-26T11:25:44.000Z',
      Messages: [
        {
          id: 4,
          content: '이름 중복 가능?',
          isHead: true,
          createdAt: '2020-11-26T11:25:44.000Z',
          updatedAt: '2020-11-26T11:25:44.000Z',
          User: user01,
          Files: [],
          Reactions: [],
        },
      ],
      User: user01,
    },
  ],
  /// user list
  user: [
    {
      ...user01,
      UserChannelSection: {
        id: 1,
        createdAt: '2020-11-25T15:09:30.000Z',
        updatedAt: '2020-11-25T15:09:30.000Z',
        deletedAt: null,
        ChannelId: 1,
        UserId: 1,
        sectionId: null,
      },
    },
    {
      ...user02,
      UserChannelSection: {
        id: 3,
        createdAt: '2020-11-25T15:09:30.000Z',
        updatedAt: '2020-11-25T15:09:30.000Z',
        deletedAt: null,
        ChannelId: 1,
        UserId: 2,
        sectionId: null,
      },
    },
    {
      ...user03,
      UserChannelSection: {
        id: 4,
        createdAt: '2020-11-26T14:06:40.000Z',
        updatedAt: '2020-11-26T14:06:40.000Z',
        deletedAt: null,
        ChannelId: 1,
        UserId: 3,
        sectionId: null,
      },
    },
  ],
}

export default channelInfo
