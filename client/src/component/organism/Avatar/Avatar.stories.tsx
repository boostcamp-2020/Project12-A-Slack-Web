import React from 'react'
import Avatar from '.'

export default {
  title: 'Organism/Avatar',
  component: Avatar,
}

export const avatar = () => {
  const user = {
    id: 3,
    email: 'caribou503@gmail.com',
    name: 'Seo Young Kim',
    profileImageUrl:
      'https://lh6.googleusercontent.com/-tOsYv0M4ksY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckjb6_Y0uojAO9pKSlhpsKV-ha2Zg/s96-c/photo.jpg',
  }

  const handleMessageButtonClick = () => alert(`DM to ${user.name}`)

  return (
    <>
      <div>SMALL size & clickable</div>
      <Avatar
        user={user}
        size="SMALL"
        clickable
        onMessageButtonClick={handleMessageButtonClick}
      />
      <hr />
      <div>MEDIUM size & clickable false</div>
      <Avatar user={user} size="MEDIUM" />
      <hr />
      <div>BIG size & clickable</div>
      <Avatar
        user={user}
        size="BIG"
        clickable
        onMessageButtonClick={handleMessageButtonClick}
      />
    </>
  )
}

avatar.story = {
  name: 'Default',
}
