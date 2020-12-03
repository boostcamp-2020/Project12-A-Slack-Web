import React, { useState, useEffect } from 'react'
import myAxios from '@util/myAxios'
import styled from 'styled-components'
import O from '@organism'

interface ChannelBrowserPropsType {
  workspaceId: number
}

interface Channel extends Object {
  id: number
  type: string
  name: string
  memberCount: number
  joined: boolean
}

const ChannelBrowser = ({ workspaceId }: ChannelBrowserPropsType) => {
  const channelBrowserMainViewHeader = (
    <O.ChannelBrowserHeader workspaceId={workspaceId} />
  )
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    const getWorkspaceChannels = async () => {
      const {
        data: { data },
      } = await myAxios.get({
        path: `/channel/all?workspaceId=${workspaceId}`,
      })
      console.log(data)
      setChannels(data)
    }
    getWorkspaceChannels()
  }, [])

  const channelBrowserMainViewBody = <O.ChannelList channelList={channels} />

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
