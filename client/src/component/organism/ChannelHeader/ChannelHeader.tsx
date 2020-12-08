import React, { useState } from 'react'
import A from '@atom'
import O from '@organism'
import myIcon from '@constant/icon'
import { ButtonType } from '@atom/Button'
import { ImageType } from '@atom/Image'
import { TextType } from '@atom/Text'
import { ChannelHeaderProps } from '.'

import Styled from './ChannelHeader.style'

const ChannelHeader = ({ channelInfo }: ChannelHeaderProps) => {
  const { name, type, memberCount, memberMax3 } = channelInfo

  const [memberListModalVisible, setMemberListModalVisible] = useState(false)
  const [addPeopleModalVisible, setAddPeopleModalVisible] = useState(false)

  /** modal open/close handler */
  const handleMemeberListButtonClick = () => setMemberListModalVisible(true)
  const handleMemberListModalClose = () => setMemberListModalVisible(false)

  const handleAddPeopleButtonClick = () => setAddPeopleModalVisible(true)
  const handleAddPeopleModalClose = () => setAddPeopleModalVisible(false)

  const handleStarButtonClick = () => alert('channel - section')
  const handleInfoButtonClick = () => alert('show detailed info')

  return (
    <Styled.Wrapper>
      <Styled.LeftWrapper>
        <A.Icon icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock} />
        <A.Text
          customStyle={channelNameTextStyle}
          onClick={handleInfoButtonClick}
        >
          {name}
        </A.Text>
        {/* <A.Button onClick={handleStarButtonClick} customStyle={buttonStyle}>
          <A.Icon icon={myIcon.star} />
        </A.Button> */}
      </Styled.LeftWrapper>

      <Styled.RightWrapper>
        <A.Button
          onClick={handleMemeberListButtonClick}
          customStyle={memberListButtonStyle}
        >
          <>
            {memberMax3.map((user) => (
              <O.Avatar
                user={user}
                size="MEDIUM"
                avatarImageStyle={memberAvatarStyle}
                key={user.id}
              />
            ))}
            <Styled.MemberCountWrapper>{memberCount}</Styled.MemberCountWrapper>
          </>
        </A.Button>

        <A.Button
          onClick={handleAddPeopleButtonClick}
          customStyle={buttonStyle}
        >
          <A.Icon icon={myIcon.addUser} />
        </A.Button>
        <A.Button onClick={handleInfoButtonClick} customStyle={buttonStyle}>
          <A.Icon icon={myIcon.info} />
        </A.Button>
      </Styled.RightWrapper>

      {memberListModalVisible && (
        <O.MemberListModal
          channel={channelInfo}
          onClose={handleMemberListModalClose}
        />
      )}
      {addPeopleModalVisible && (
        <O.AddMemberModal
          channel={channelInfo}
          onClose={handleAddPeopleModalClose}
        />
      )}
    </Styled.Wrapper>
  )
}

ChannelHeader.defaultProps = {}

const buttonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  width: '30px',
  height: '30px',
  margin: '2px',
}

const memberListButtonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  height: '30px',
  margin: '3px',
}

const memberAvatarStyle: ImageType.StyleAttributes = {
  border: '2px solid white',
  margin: '0 0 0 -5px',
}

const channelNameTextStyle: TextType.StyleAttributes = {
  fontWeight: '800',
  fontSize: '1.6rem',
  cursor: 'pointer',
  margin: '0 5px 0 3px',
}

export default ChannelHeader
