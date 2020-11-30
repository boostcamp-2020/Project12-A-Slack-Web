import React, { useState } from 'react'
import A from '@atom'
import O from '@organism'
import styled from 'styled-components'

const ChannelBrowserPage = () => {
  const [subViewShow, setSubViewShow] = useState(true)

  const toggleSubContainer = () => {
    setSubViewShow(!subViewShow)
  }
  return (
    <WorkspaceContainer>
      <O.Header />

      <WorkspaceLayout>
        <O.SideBar />
        <ViewContainer>
          <MainView>
            <A.Button onClick={toggleSubContainer}>open sub view</A.Button>
            main
          </MainView>
          {subViewShow && <SubView>sub</SubView>}
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

export default ChannelBrowserPage
