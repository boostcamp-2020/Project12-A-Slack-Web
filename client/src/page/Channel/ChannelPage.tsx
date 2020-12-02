import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import M from '@molecule'
import O from '@organism'
import styled from 'styled-components'
import { RootState } from '@store'
import { getThreadsAsync } from '@store/thread.store'

import channelInfo from './data'

const ChannelPage = () => {
  const { threadList, loading, error } = useSelector(
    (state: RootState) => state.threadStore,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getThreadsAsync())
  }, [])
  const channel = channelInfo

  const [subViewShow, setSubViewShow] = useState(false)
  const [subViewHeader, setSubViewHeader] = useState<React.ReactNode>(<></>)
  const [subViewBody, setSubViewBody] = useState<React.ReactNode>(<></>)

  const handleSubViewOpen = () => setSubViewShow(true)
  const handleSubViewClose = () => setSubViewShow(false)

  /** Channel Browser page */
  // const mainViewHeader = <O.ChannelBrowserHeader workspaceId={1} />
  // const mainViewBody = <O.ChannelList channelList={[]} />

  /** Channel page */
  const mainViewHeader = <O.ChannelHeader channel={channel} />
  const mainViewBody = (
    <O.ThreadList
      channel={channel}
      handleSubViewOpen={handleSubViewOpen}
      handleSubViewHeader={setSubViewHeader}
      handleSubViewBody={setSubViewBody}
    />
  )

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
              <ViewHeader>
                {subViewHeader}
                <M.CloseButton onClick={handleSubViewClose} />
              </ViewHeader>
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
  grid-template-rows: 38px auto;
  grid-template-columns: auto;
`

const WorkspaceLayout = styled.div`
  // grid-row: 1 / 2;
  // grid-column: 2 / 3;
  // height: 100%;
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
  flex: 3 3 0;
`
const SubView = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgb(230, 230, 230);
  flex: 2 2 0;
`

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

export default ChannelPage
