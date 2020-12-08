import React, { useState } from 'react'
import A from '@atom'
import O from '@organism'
import { InputType } from '@atom/Input'
import { TextType } from '@atom/Text'
import { ChannelListProps } from '.'

import Styled from './ChannelList.style'

const ChannelList = ({ channelList }: ChannelListProps) => {
  const channelCount = channelList.length

  const [searchKeyword, setSearchKeyword] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value
    setSearchKeyword(input)
  }

  return (
    <Styled.Wrapper>
      <A.Input
        placeholder="Search by channel name or description"
        value={searchKeyword}
        onChange={handleInputChange}
        customStyle={inputStyle}
      />
      <Styled.ResultListHeaderWrapper>
        <A.Text customStyle={resultHeaderTextStyle}>
          {channelCount + (channelCount > 1 ? ' channels' : ' channel')}
        </A.Text>
      </Styled.ResultListHeaderWrapper>

      <Styled.ResultListWrapper>
        {channelList.map((channel) => (
          <O.ChannelCard channel={channel} key={channel.id} />
        ))}
      </Styled.ResultListWrapper>
    </Styled.Wrapper>
  )
}

const inputStyle: InputType.StyleAttributes = {
  border: '1px solid grey',
  borderRadius: '5px',
  padding: '0 10px',
  margin: '20px 0',
  fontSize: '1.4rem',
}

const resultHeaderTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.4rem',
  fontWeight: '500',
}

export default ChannelList
