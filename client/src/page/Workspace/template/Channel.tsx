import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import O from '@organism'
import styled from 'styled-components'
import { RootState } from '@store'
import { getThreads } from '@store/reducer/thread.reducer'
import { getCurrentChannel } from '@store/reducer/channel.reducer'

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
  const { threadList } = useSelector((state: RootState) => state.threadStore)
  const { currentChannel } = useSelector(
    (state: RootState) => state.channelStore,
  )

  const { channelId } = useParams<MatchParamsType>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentChannel.request({ channelId: +channelId }))
    dispatch(getThreads.request({ channelId: +channelId }))
  }, [])

  return (
    <>
      <ViewHeader>
        <O.ChannelHeader channelInfo={currentChannel} />
      </ViewHeader>
      <ViewBody>
        <O.ThreadList
          channelInfo={currentChannel}
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
