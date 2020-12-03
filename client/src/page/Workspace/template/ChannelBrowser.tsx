import React from 'react'
import styled from 'styled-components'
import O from '@organism'

interface ChannelBrowserPropsType {
  workspaceId: number
}

const ChannelBrowser = ({ workspaceId }: ChannelBrowserPropsType) => {
  const channelBrowserMainViewHeader = (
    <O.ChannelBrowserHeader workspaceId={workspaceId} />
  )
  const channelBrowserMainViewBody = <O.ChannelList channelList={[]} />

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
