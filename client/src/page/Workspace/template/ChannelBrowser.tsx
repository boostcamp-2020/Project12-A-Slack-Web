import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '@store'
import styled from 'styled-components'
import A from '@atom'
import O from '@organism'
import { InputType } from '@atom/Input'
import { TextType } from '@atom/Text'
import { ChannelCardType } from '@type/channel.type'
import channelAPI from '@api/channel'
import { joinChannel, deleteMember } from '@store/reducer/channel.reducer'

interface ChannelBrowserPropsType {
  workspaceId: number
}

const ChannelBrowser = ({ workspaceId }: ChannelBrowserPropsType) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { channelList, loginUserId } = useSelector((state: RootState) => {
    return {
      channelList: state.channelStore.channelList,
      loginUserId: state.userStore.currentUser.id,
    }
  })
  const [channels, setChannels] = useState<ChannelCardType[]>([])
  const [inputKeyword, setInputKeyword] = useState('')

  const searchChannels = async (searchKeyword: string) => {
    const { success, data } = await channelAPI.searchChannels({
      workspaceId,
      searchKeyword,
    })
    const filteredChannels = data
      .map((channel: ChannelCardType) => {
        return {
          ...channel,
          joined: channelList.find((chann) => chann.id === channel.id),
        }
      })
      .filter(
        (ch: ChannelCardType) =>
          (ch.type === 'PRIVATE' && ch.joined) || ch.type === 'PUBLIC',
      )
    if (success) setChannels(filteredChannels)
  }

  useEffect(() => {
    searchChannels('')
  }, [channelList])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputKeyword(inputValue)
  }
  const handleKeyPressOnInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === 'Enter') searchChannels(inputKeyword)
  }

  const handleJoinButtonClick = (channel: ChannelCardType) => () => {
    const onSuccess = () =>
      history.push(`/workspace/${workspaceId}/channel/${channel.id}`)
    dispatch(joinChannel.request({ channel, workspaceId, onSuccess }))
  }

  const handleLeaveButtonClick = (channel: ChannelCardType) => () => {
    // TODO: redirection 말고 channel browser의 data와 store의 channel list를 update 하는 방식 고려
    dispatch(
      deleteMember({
        channelId: channel.id,
        userId: loginUserId,
        onSuccess: () => {
          window.location.href = `/workspace/${workspaceId}/channel-browser`
        },
      }),
    )
  }

  const channelBrowserMainViewHeader = (
    <O.ChannelBrowserHeader workspaceId={workspaceId} />
  )
  const channelBrowserMainViewBody = (
    <Wrapper>
      <HeaderWrapper>
        <A.Input
          placeholder="Search by channel name or description"
          value={inputKeyword}
          onChange={handleInputChange}
          customStyle={inputStyle}
          onKeyPress={handleKeyPressOnInput}
        />

        <ResultListHeaderWrapper>
          <A.Text customStyle={resultHeaderTextStyle}>
            {channels.length === 0
              ? 'No results'
              : channels.length +
                (channels.length > 1 ? ' channels' : ' channel')}
          </A.Text>
        </ResultListHeaderWrapper>
      </HeaderWrapper>

      <O.ChannelList
        channelList={channels}
        onJoinButtonClick={handleJoinButtonClick}
        onLeaveButtonClick={handleLeaveButtonClick}
      />
    </Wrapper>
  )

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  height: 100%;
`
const HeaderWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
`
const ResultListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 0;
  border-bottom: 1px solid rgb(230, 230, 230);
`

const inputStyle: InputType.StyleAttributes = {
  border: '1px solid grey',
  borderRadius: '5px',
  padding: '0 10px',
  margin: '20px 0',
  fontSize: '1.4rem',
  width: '100%',
}
const resultHeaderTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.4rem',
  fontWeight: '500',
}

export default ChannelBrowser
