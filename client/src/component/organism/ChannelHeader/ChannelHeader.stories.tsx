import React from 'react'
import ChannelHeader from '.'

export default {
  title: 'Organism/ChannelHeader',
  component: ChannelHeader,
}

export const channelHeader = () => {
  const publicChannel = {
    id: 1,
    type: 'PUBLIC',
    name: 'slack-clone',
    user: [
      {
        id: 1,
        email: 'dlgkswn885@korea.ac.kr',
        name: '‍이한주[ 학부재학 / 산업경영공학부 ]',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-N1Pn-Or52MM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7DRZcFBqsGNFc9Z5LUf8hGZRi5g/s96-c/photo.jpg',
      },
      {
        id: 2,
        email: 'ihanju95@gmail.com',
        name: '이두주',
        profileImageUrl:
          'https://lh3.googleusercontent.com/-VDkRdj9PpUo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnTBFod0S-59xYDXy2Y5oG8kAFYnA/s96-c/photo.jpg',
      },
      {
        id: 3,
        email: 'caribou503@gmail.com',
        name: 'Seo Young Kim',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
      },
    ],
  }

  const privateChannel = {
    id: 2,
    type: 'PRIVATE',
    name: 'slack-clone-private-channel',
    user: [
      {
        id: 1,
        email: 'dlgkswn885@korea.ac.kr',
        name: '‍이한주[ 학부재학 / 산업경영공학부 ]',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-N1Pn-Or52MM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7DRZcFBqsGNFc9Z5LUf8hGZRi5g/s96-c/photo.jpg',
      },
    ],
  }

  return (
    <>
      <div>Public channel</div>
      <ChannelHeader channel={publicChannel} />

      <hr />
      <div>Private channel</div>
      <ChannelHeader channel={privateChannel} />
    </>
  )
}

channelHeader.story = {
  name: 'Default',
}
