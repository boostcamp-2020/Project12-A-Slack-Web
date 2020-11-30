import React, { useState } from 'react'
import O from '@organism'
import styled from 'styled-components'

const ChannelBrowserPage = () => {
  const workspaceId = 1
  const channelList = [
    {
      id: 1,
      type: 'PUBLIC',
      name: 'slack-clone',
      memberCount: 3,
      joined: true,
    },
    {
      id: 2,
      type: 'PRIVATE',
      name: 'slack-clone-private-channel',
      memberCount: 1,
      joined: false,
    },
  ]

  const [subViewShow, setSubViewShow] = useState(true)

  const handleSubViewOpen = () => setSubViewShow(true)
  const handleSubViewClose = () => setSubViewShow(false)

  const mainViewHeader = <O.ChannelBrowserHeader workspaceId={workspaceId} />
  const mainViewBody = <O.ChannelList channelList={channelList} />

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
  padding: 20px;
  width: 100%;
  height: 100%;
`

export default ChannelBrowserPage
