import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import myAxios from '@util/myAxios'
import styled from 'styled-components'
import O from '@organism'
import { RootState } from '@store'
import { joinChannel } from '@store/reducer/channel.reducer'
import { ChannelCardType } from '@type/channel.type'

interface AllDmsPropTypes {
  workspaceId: number
}

const AllDms = ({ workspaceId }: AllDmsPropTypes) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // const getWorkspaceChannels = async () => {
    //   const {
    //     data: { data },
    //   } = await myAxios.get({
    //     path: `/channel/all?workspaceId=${workspaceId}`,
    //   })
  }, [])

  const channelBrowserMainViewHeader = (
    <O.ChannelBrowserHeader workspaceId={1} />
  )

  return (
    <>
      <ViewHeader>{channelBrowserMainViewHeader}</ViewHeader>
      <ViewBody>aaa</ViewBody>
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

export default AllDms
