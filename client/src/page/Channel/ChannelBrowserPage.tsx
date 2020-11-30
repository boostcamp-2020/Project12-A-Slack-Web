import React, { useState } from 'react'
import A from '@atom'
import O from '@organism'
import styled from 'styled-components'

const ChannelBrowserPage = () => {
  const workspaceId = 1

  const [subViewShow, setSubViewShow] = useState(true)

  const handleSubViewOpen = () => setSubViewShow(true)
  const handleSubViewClose = () => setSubViewShow(false)

  const subView = 'nothing'

  return (
    <WorkspaceContainer>
      <O.Header />

      <WorkspaceLayout>
        <O.SideBar />
        <ViewContainer>
          <MainView>
            <ChannelBrowserHeader>
              <O.ChannelBrowserHeader workspaceId={workspaceId} />
            </ChannelBrowserHeader>
          </MainView>
          {subViewShow && <SubView>{subView}</SubView>}
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
`
const SubView = styled.div`
  width: 65%;
  border-left: 1px solid rgb(230, 230, 230);
`

const ChannelBrowserHeader = styled.div`
  display: flex;
  height: 61px;
  border-bottom: 1px solid rgb(230, 230, 230);
  border-top: 1px solid rgb(230, 230, 230);
`

export default ChannelBrowserPage
