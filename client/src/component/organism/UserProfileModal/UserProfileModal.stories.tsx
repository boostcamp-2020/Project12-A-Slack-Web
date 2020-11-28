import React from 'react'
import UserProfileModal from '.'

export default {
  title: 'Organism/UserProfileModal',
  component: UserProfileModal,
}

export const userProfileModal = () => {
  const user = {
    id: 3,
    email: 'caribou503@gmail.com',
    name: 'Seo Young Kim',
    profileImageUrl:
      'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
  }
  const handleMessageButtonClick = () => alert(`DM !`)

  return (
    <UserProfileModal
      user={user}
      onMessageButtonClick={handleMessageButtonClick}
    />
  )
}
