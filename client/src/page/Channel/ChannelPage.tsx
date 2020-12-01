import React, { useState } from 'react'
import O from '@organism'
import styled from 'styled-components'

import channelInfo from './data'

const ChannelBrowserPage = () => {
  const channel = channelInfo

  const [subViewShow, setSubViewShow] = useState(true)

  const handleSubViewOpen = () => setSubViewShow(true)
  const handleSubViewClose = () => setSubViewShow(false)

  /** Channel Browser page */
  // const mainViewHeader = <O.ChannelBrowserHeader workspaceId={workspaceId} />
  // const mainViewBody = <O.ChannelList channelList={channelList} />

  /** Channel page */
  const mainViewHeader = <O.ChannelHeader channel={channel} />
  const mainViewBody = (
    <ChannelMainContainer>
      <ThreadListContainer>
        {channel.Threads.map((thread) => (
          <O.MessageCard
            data={thread}
            onReplyButtonClick={() => alert(`thread id: ${thread.id}`)}
          />
        ))}
      </ThreadListContainer>
      <EditorContainer>
        <O.MessageEditor />
      </EditorContainer>
    </ChannelMainContainer>
  )

  const subViewHeader = 'sub view header'
  const subViewBody = 'sub view body'

  return (
    <WorkspaceContainer>
      <O.Header />

      <WorkspaceLayout>
        <O.SideBar />
        <ViewContainer>
          <MainView>
            <ViewHeader>{mainViewHeader}</ViewHeader>
            <ViewBody>{mainViewBody}</ViewBody>
          </MainView>

          {subViewShow && (
            <SubView>
              <ViewHeader>{subViewHeader}</ViewHeader>
              <ViewBody>{subViewBody}</ViewBody>
            </SubView>
          )}
        </ViewContainer>
      </WorkspaceLayout>
    </WorkspaceContainer>
  )
}

const WorkspaceContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px auto min-content;
  grid-template-columns: auto;
`

const WorkspaceLayout = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 230px auto;
`

const ViewContainer = styled.div`
  display: flex;
`
const MainView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const SubView = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgb(230, 230, 230);
`

const ViewHeader = styled.div`
  display: flex;
  height: 61px;
  border-bottom: 1px solid rgb(230, 230, 230);
  border-top: 1px solid rgb(230, 230, 230);
`

const ViewBody = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ChannelMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-end;
  position: relative;
  box-sizing: content-box;
  height: 100%;
`
const ThreadListContainer = styled.div`
  height: 82%;
  overflow-y: auto;
  overflow-x: hidden;
`
const EditorContainer = styled.div`
  height: 18%;
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0;
`

export default ChannelBrowserPage
