import React, { useState } from 'react'
import A from '@atom'
import M from '@molecule'
import color from '@constant/color'
import myIcon from '@constant/icon'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { IconType } from '@atom/Icon'
import { ChannelCardProps } from '.'

import Styled from './ChannelCard.style'

const ChannelCard = ({
  channel,
  onJoinButtonClick,
  onLeaveButtonClick,
}: ChannelCardProps) => {
  const { id, name, type, memberCount, joined } = channel

  const [hover, setHover] = useState<boolean>(false)

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  // onJoinButtonClick = () => {
  //   // channel 가입 (saga async api 요청)
  //   // channel 가입 성공 시 channelStore의 channelList에 추가
  //   // & ChannelBrowser 페이지 - channels의 해당 channel에 memberCount++
  // }

  // onLeaveButtonClick = () => {
  //   // channel 탈퇴 (saga async api 요청)
  //   // channel 탈퇴 성공 시 channelStore의 channelList에서 삭제
  //   // & ChannelBrowser 페이지 - channels의 해당 channel에 memberCount--
  // }

  const handleButtonClick = joined ? onLeaveButtonClick : onJoinButtonClick
  const optionalButtonStyle = joined ? leaveButtonStyle : joinButtonStyle
  const optionalButtonTextStyle = joined ? {} : { color: 'white' }
  const buttonText = joined ? 'Leave' : 'Join'

  return (
    <Styled.Wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Styled.ChannelInfoWrapper>
        <Styled.ChannelSubTextWrapper>
          <A.Icon icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock} />
          <A.Text customStyle={channelNameTextStyle}>{name}</A.Text>
        </Styled.ChannelSubTextWrapper>

        <Styled.ChannelSubTextWrapper>
          {joined && (
            <A.Text customStyle={joinedTextStyle}>
              <>
                <A.Icon icon={myIcon.check} customStyle={joinedIconStyle} />
                Joined
              </>
            </A.Text>
          )}

          <A.Text customStyle={memberCountTextStyle}>
            {memberCount + (memberCount > 1 ? ' members' : ' member')}
          </A.Text>
        </Styled.ChannelSubTextWrapper>
      </Styled.ChannelInfoWrapper>

      {hover && (
        <M.ButtonDiv
          onClick={handleButtonClick}
          buttonStyle={{
            ...buttonStyle,
            ...optionalButtonStyle,
          }}
          textStyle={{ ...buttonTextStyle, ...optionalButtonTextStyle }}
        >
          {buttonText}
        </M.ButtonDiv>
      )}
    </Styled.Wrapper>
  )
}

ChannelCard.defaultProps = {}

const channelNameTextStyle: TextType.StyleAttributes = {
  fontWeight: 'bold',
  cursor: 'pointer',
  margin: '0 0 0 5px',
  fontSize: '1.6rem',
}

const buttonStyle: ButtonType.StyleAttributes = {
  padding: '10px',
  width: '80px',
  height: '36px',
  cursor: 'pointer',
}
const buttonTextStyle: TextType.StyleAttributes = {
  fontWeight: '500',
  fontSize: '1.4rem',
}

const leaveButtonStyle: ButtonType.StyleAttributes = {
  border: `1px solid ${color.get('darkGrey')}`,
  backgroundColor: 'white',
  hoverBackgroundColor: 'greyHover',
}

const joinButtonStyle: ButtonType.StyleAttributes = {
  border: `1px solid ${color.get('green')}`,
  backgroundColor: 'green',
  hoverBackgroundColor: 'greenHover',
}

const joinedTextStyle: TextType.StyleAttributes = {
  color: 'green',
  fontSize: '1.3rem',
  margin: '0 10px 0 0',
}

const joinedIconStyle: IconType.StyleAttributes = {
  color: 'green',
  margin: '0 5px 0 0',
}

const memberCountTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.3rem',
}

export default ChannelCard
