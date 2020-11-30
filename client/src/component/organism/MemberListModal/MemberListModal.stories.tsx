import React from 'react'
import MemberListModal from '.'

export default {
  title: 'Organism/MemberListModal',
  component: MemberListModal,
}

export const memberListModal = () => {
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
        name: 'Seo Young Kim)',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
      },
      {
        id: 4,
        email: 'caribou503@gmail.com',
        name: 'Seo Young Kim( + - _ ; \\',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
      },
      {
        id: 4,
        email: 'caribou503@gmail.com',
        name: 'Seo Young Kim#<  ]',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
      },
      {
        id: 4,
        email: 'caribou503@gmail.com',
        name: 'Seo Young Kim @ & " ',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
      },
      {
        id: 4,
        email: 'caribou503@gmail.com',
        name: 'Seo Young Kim',
        profileImageUrl:
          'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
      },
    ],
  }

  return <MemberListModal channel={publicChannel} />
}

memberListModal.story = {
  name: 'Default',
}
