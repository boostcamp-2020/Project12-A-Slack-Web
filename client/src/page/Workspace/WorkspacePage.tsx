import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, useParams } from 'react-router-dom'
import M from '@molecule'
import O from '@organism'
import styled from 'styled-components'
import { RootState } from '@store'
import { getChannelsAsync } from '@store/reducer/channel.reducer'
import socket, { useSocket } from '../../socket'
import { Channel, ChannelBrowser } from './template'

interface MatchParamsType {
  workspaceId: string
}

const WorkspacePage = () => {
  const { channelList, loading, error } = useSelector(
    (state: RootState) => state.channelStore,
  )
  const dispatch = useDispatch()
  const { workspaceId } = useParams<MatchParamsType>()

  useSocket(socket, dispatch)

  const [subViewShow, setSubViewShow] = useState(false)
  const [subViewHeader, setSubViewHeader] = useState<React.ReactNode>(<></>)
  const [subViewBody, setSubViewBody] = useState<React.ReactNode>(<></>)

  const handleSubViewOpen = () => setSubViewShow(true)
  const handleSubViewClose = () => setSubViewShow(false)
  const handleSubViewHeader = (node: React.ReactNode) => setSubViewHeader(node)
  const handleSubViewBody = (node: React.ReactNode) => setSubViewBody(node)

  useEffect(() => {
    dispatch(getChannelsAsync.request({ workspaceId: +workspaceId }))
  }, [])

  return (
    <WorkspaceContainer>
      <O.Header />

      <WorkspaceLayout>
        <O.SideBar />

        <ViewContainer>
          <Switch>
            <MainView>
              <Route path={`/workspace/${workspaceId}/channel/:channelId`}>
                <Channel
                  handleSubViewOpen={handleSubViewOpen}
                  handleSubViewHeader={handleSubViewHeader}
                  handleSubViewBody={handleSubViewBody}
                />
              </Route>
              <Route path={`/workspace/${workspaceId}/channel-browser`}>
                <ChannelBrowser workspaceId={+workspaceId} />
              </Route>
            </MainView>
          </Switch>
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

export default WorkspacePage
