import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store'
import A from '@atom'
import M from '@molecule'
import color from '@constant/color'
import myIcon from '@constant/icon'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import { IconType } from '@atom/Icon'
import { useHistory } from 'react-router-dom'
import { ChannelCardProps } from '.'

import Styled from './ChannelCard.style'

const ChannelCard = ({
  channel,
  onJoinButtonClick,
  onLeaveButtonClick,
}: ChannelCardProps) => {
  const history = useHistory()
  const { id: workspaceId } = useSelector(
    (state: RootState) => state.workspaceStore.currentWorkspace,
  )
  const { id, name, type, memberCount, joined } = channel

  const [hover, setHover] = useState<boolean>(false)

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)
  const handleChannelClick = () => {
    history.push(`/workspace/${workspaceId}/channel/${id}`)
  }

  const handleButtonClick = joined
    ? onLeaveButtonClick(channel)
    : onJoinButtonClick(channel)
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
          <A.Text
            customStyle={channelNameTextStyle}
            onClick={handleChannelClick}
          >
            {name}
          </A.Text>
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
  cursor: 'pointer',
  padding: '10px',
  width: '80px',
  height: '36px',
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
  border: `1px solid ${color.get('deepGreen')}`,
  backgroundColor: 'deepGreen',
  hoverBackgroundColor: 'deepGreenHover',
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
