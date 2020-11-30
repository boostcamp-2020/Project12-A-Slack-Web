import React from 'react'
import ChannelCard from '.'

export default {
  title: 'Organism/ChannelCard',
  component: ChannelCard,
}

export const channelCard = () => {
  const publicChannel = {
    id: 1,
    type: 'PUBLIC',
    name: 'slack-clone',
    memberCount: 3,
    joined: true,
  }

  const privateChannel = {
    id: 2,
    type: 'PRIVATE',
    name: 'slack-clone-private-channel',
    memberCount: 1,
    joined: false,
  }

  return (
    <>
      <ChannelCard
        channel={publicChannel}
        onLeaveButtonClick={() => alert('leave')}
      />
      <ChannelCard
        channel={privateChannel}
        onJoinButtonClick={() => alert('join')}
      />
    </>
  )
}

channelCard.story = {
  name: 'Default',
}
