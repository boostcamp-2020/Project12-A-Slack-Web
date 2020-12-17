import React from 'react'
import A from '@atom'
import O from '@organism'
import { TextType } from '@atom/Text'
import { ChannelListProps } from '.'

import Styled from './ChannelList.style'

const ChannelList = ({
  channelList,
  onJoinButtonClick,
  onLeaveButtonClick,
}: ChannelListProps) => {
  return (
    <Styled.ResultListWrapper>
      {channelList.length === 0 ? (
        <Styled.NoResultsWrapper>
          <A.Text customStyle={noResultsTextStyle}>No results</A.Text>
          <A.Text customStyle={descTextStyle}>
            You might want to try using different keywords,
          </A.Text>
          <A.Text customStyle={descTextStyle}>
            checking for typos or adjusting your filters.
          </A.Text>
        </Styled.NoResultsWrapper>
      ) : (
        channelList.map((channel) => (
          <O.ChannelCard
            channel={channel}
            key={channel.id}
            onJoinButtonClick={onJoinButtonClick}
            onLeaveButtonClick={onLeaveButtonClick}
          />
        ))
      )}
    </Styled.ResultListWrapper>
  )
}

// TODO: 중복되는 스타일 합치기 - TeammateList와 중복
const noResultsTextStyle: TextType.StyleAttributes = {
  fontSize: '2rem',
  fontWeight: '800',
  margin: '3px 0',
}
const descTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
}

export default ChannelList
