import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, useParams, RouteComponentProps } from 'react-router-dom'
import O from '@organism'
import styled from 'styled-components'
import { RootState } from '@store'
import {
  getThreadsAsync,
  getChannelInfoAsync,
} from '@store/reducer/thread.reducer'

// import channel from './data'

interface MatchParamsType {
  channelId: string
}

interface ChannelProps {
  handleSubViewHeader: (node: React.ReactNode) => void
  handleSubViewBody: (node: React.ReactNode) => void
  handleSubViewOpen: () => void
}

const Channel = ({
  handleSubViewOpen,
  handleSubViewHeader,
  handleSubViewBody,
}: ChannelProps) => {
  const { threadList, channelInfo, loading, error } = useSelector(
    (state: RootState) => state.threadStore,
  )

  const { channelId } = useParams<MatchParamsType>()
  const dispatch = useDispatch()
  console.log(`channelId: ${channelId}`)

  useEffect(() => {
    dispatch(getChannelInfoAsync.request(+channelId))
    dispatch(getThreadsAsync.request(+channelId))
  }, [])

  return (
    <>
      <ViewHeader>
        <O.ChannelHeader channelInfo={channelInfo} />
      </ViewHeader>
      <ViewBody>
        <O.ThreadList
          channelInfo={channelInfo}
          threads={threadList}
          handleSubViewOpen={handleSubViewOpen}
          handleSubViewHeader={handleSubViewHeader}
          handleSubViewBody={handleSubViewBody}
        />
      </ViewBody>
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

export default Channel
