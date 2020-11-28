import React, { useState } from 'react'
import A from '@atom'
import O from '@organism'
import myIcon from '@constant/icon'
import { ButtonType } from '@atom/Button'
import { ImageType } from '@atom/Image'
import { ChannelHeaderProps } from '.'

import Styled from './ChannelHeader.style'

const ChannelHeader = ({ channel }: ChannelHeaderProps) => {
  const { id, name, type, user: members } = channel
  const MEMBER_PROFILE_NUMBER: number = 3

  const [memberListModalVisible, setMemberListModalVisible] = useState(false)
  const [addUserModalVisible, setAddUserModalVisible] = useState(false)

  /** modal open/close handler */
  const handleMemeberListButtonClick = () => setMemberListModalVisible(true)
  const handleMemberListModalClose = () => setMemberListModalVisible(false)

  const handleAddUserButtonClick = () => setAddUserModalVisible(true)
  const handleAddUserModalClose = () => setAddUserModalVisible(false)

  const handleStarButtonClick = () => alert('channel - section')
  const handleInfoButtonClick = () => alert('show detailed info')

  return (
    <Styled.Wrapper>
      <Styled.LeftWrapper>
        <A.Icon icon={type === 'PUBLIC' ? myIcon.hashtag : myIcon.lock} />
        <A.Text
          customStyle={{
            fontWeight: 'bold',
            cursor: 'pointer',
            margin: '0 0 0 8px',
          }}
          onClick={handleInfoButtonClick}
        >
          {name}
        </A.Text>
        <A.Button onClick={handleStarButtonClick} customStyle={buttonStyle}>
          <A.Icon icon={myIcon.star} />
        </A.Button>
      </Styled.LeftWrapper>

      <Styled.RightWrapper>
        <A.Button
          onClick={handleMemeberListButtonClick}
          customStyle={memberListButtonStyle}
        >
          <>
            {members
              .filter((user, idx) => idx < MEMBER_PROFILE_NUMBER)
              .map((user) => (
                <O.Avatar
                  user={user}
                  size="SMALL"
                  avatarImageStyle={memberAvatarStyle}
                />
              ))}
            <Styled.MemberCountWrapper>
              {members.length}
            </Styled.MemberCountWrapper>
          </>
        </A.Button>

        <A.Button onClick={handleAddUserButtonClick} customStyle={buttonStyle}>
          <A.Icon icon={myIcon.addUser} />
        </A.Button>
        <A.Button onClick={handleInfoButtonClick} customStyle={buttonStyle}>
          <A.Icon icon={myIcon.info} />
        </A.Button>
      </Styled.RightWrapper>

      {memberListModalVisible && (
        <O.MemberListModal
          channel={channel}
          onClose={handleMemberListModalClose}
        />
      )}
      {/* {addUserModalVisible && (
        <O.AddUserModal
          channel={channel}
          modalAttributes={{ position: 'fixed', left: '50%', top: '50%' }}
          onClose={handleAddUserModalClose}
        />
      )} */}
    </Styled.Wrapper>
  )
}

ChannelHeader.defaultProps = {}

const buttonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  width: '2rem',
  height: '1.9rem',
  margin: '2px',
}

const memberListButtonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  height: '1.9rem',
  margin: '2px',
}

const memberAvatarStyle: ImageType.StyleAttributes = {
  border: '2px solid white',
  margin: '0 0 0 -5px',
}

export default ChannelHeader
