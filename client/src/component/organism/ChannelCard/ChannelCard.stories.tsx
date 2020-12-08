import React from 'react'
import { Channel } from '@type/channel.type'
import ChannelCard from '.'

export default {
  title: 'Organism/ChannelCard',
  component: ChannelCard,
}

export const channelCard = () => {
  const publicChannel: Channel = {
    id: 1,
    type: 'PUBLIC',
    name: 'slack-clone',
    memberCount: 3,
    joined: true,
  }

  const privateChannel: Channel = {
    id: 2,
    type: 'PRIVATE',
    name: 'slack-clone-private-channel',
    memberCount: 1,
    joined: false,
  }

  const handleJoinButtonClick = (channel: Channel) => () =>
    alert(`${channel.id} join!`)

  const handleLeaveButtonClick = (channel: Channel) => () =>
    alert(`${channel.id} leave!`)

  return (
    <>
      <ChannelCard
        channel={publicChannel}
        onLeaveButtonClick={handleLeaveButtonClick}
        onJoinButtonClick={handleJoinButtonClick}
      />
      <ChannelCard
        channel={privateChannel}
        onLeaveButtonClick={handleLeaveButtonClick}
        onJoinButtonClick={handleJoinButtonClick}
      />
    </>
  )
}

channelCard.story = {
  name: 'Default',
}
