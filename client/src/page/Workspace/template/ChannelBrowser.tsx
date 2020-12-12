import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store'
import styled from 'styled-components'
import O from '@organism'
import { ChannelCardType } from '@type/channel.type'
import channelAPI from '@api/channel'
import { joinChannel, deleteMember } from '@store/reducer/channel.reducer'

interface ChannelBrowserPropsType {
  workspaceId: number
}

const ChannelBrowser = ({ workspaceId }: ChannelBrowserPropsType) => {
  const dispatch = useDispatch()
  const { channelList, loginUserId } = useSelector((state: RootState) => {
    return {
      channelList: state.channelStore.channelList,
      loginUserId: state.userStore.currentUser.id,
    }
  })
  const [channels, setChannels] = useState<ChannelCardType[]>([])

  useEffect(() => {
    const getWorkspaceChannels = async () => {
      const { success, data } = await channelAPI.getAllChannels({
        workspaceId,
      })
      // TODO: success 여부에 따른 처리
      const filterdChannels = data
        .map((channel: ChannelCardType) => {
          return {
            ...channel,
            joined: channelList.find((chann) => chann.id === channel.id),
          }
        })
        .filter(
          (ch: ChannelCardType) =>
            (ch.type === 'PRIVATE' && ch.joined) || ch.type === 'PUBLIC',
        )
      setChannels(filterdChannels)
    }
    getWorkspaceChannels()
  }, [channelList])

  const handleJoinButtonClick = (channel: ChannelCardType) => () => {
    dispatch(joinChannel.request({ channel }))
    // TODO: ChannelBrowser 페이지 - channels의 해당 channel에 memberCount++
  }

  const handleLeaveButtonClick = (channel: ChannelCardType) => () => {
    // TODO: redirection 말고 channel browser의 data와 store의 channel list를 update 하는 방식 고려
    dispatch(
      deleteMember({
        channelId: channel.id,
        userId: loginUserId,
        onSuccess: () => {
          window.location.href = `/workspace/${workspaceId}/channel-browser`
        },
      }),
    )
  }

  const channelBrowserMainViewHeader = (
    <O.ChannelBrowserHeader workspaceId={workspaceId} />
  )
  const channelBrowserMainViewBody = (
    <O.ChannelList
      channelList={channels}
      onJoinButtonClick={handleJoinButtonClick}
      onLeaveButtonClick={handleLeaveButtonClick}
    />
  )

  return (
    <>
      <ViewHeader>{channelBrowserMainViewHeader}</ViewHeader>
      <ViewBody>{channelBrowserMainViewBody}</ViewBody>
    </>
  )
}

const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 61px;
  flex: 0 0 61px;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(230, 230, 230);
  border-top: 1px solid rgb(230, 230, 230);
`

const ViewBody = styled.div`
  flex: 1 1 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

export default ChannelBrowser
