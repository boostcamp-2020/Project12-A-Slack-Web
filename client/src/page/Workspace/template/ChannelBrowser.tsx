import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import myAxios from '@util/myAxios'
import styled from 'styled-components'
import O from '@organism'
import { RootState } from '@store'
import { joinChannel } from '@store/reducer/channel.reducer'
import { ChannelCardType } from '@type/channel.type'

interface ChannelBrowserPropsType {
  workspaceId: number
}

const ChannelBrowser = ({ workspaceId }: ChannelBrowserPropsType) => {
  const { channelList } = useSelector((state: RootState) => state.channelStore)
  const [channels, setChannels] = useState<ChannelCardType[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    const getWorkspaceChannels = async () => {
      const {
        data: { data },
      } = await myAxios.get({
        path: `/channel/all?workspaceId=${workspaceId}`,
      })

      const filterdChannels = data.map((channel: ChannelCardType) => {
        return {
          ...channel,
          joined: channelList.find((chann) => chann.id === channel.id),
        }
      })

      setChannels(filterdChannels)
    }
    getWorkspaceChannels()
  }, [channelList])

  const handleJoinButtonClick = (channel: ChannelCardType) => () => {
    dispatch(joinChannel.request({ channel }))
    // TODO: ChannelBrowser 페이지 - channels의 해당 channel에 memberCount++
  }

  const handleLeaveButtonClick = (channel: ChannelCardType) => () => {
    // channel 탈퇴 (saga async api 요청)
    // channel 탈퇴 성공 시 channelStore의 channelList에서 삭제
    // & ChannelBrowser 페이지 - channels의 해당 channel에 memberCount--
    alert(`${channel.id} leave!`)
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
