import React, { useState } from 'react'
import A from '@atom'
import O from '@organism'
import { ImageType } from '@atom/Image'
import { AvatarProps } from '.'

import Styled from './Avatar.style'

const Avatar = ({
  user,
  size,
  clickable,
  onMessageButtonClick,
}: AvatarProps) => {
  const { id, email, name, profileImageUrl } = user
  const [profileModalVisible, setProfileModalVisible] = useState(false)

  // eslint-disable-next-line no-nested-ternary
  const squarePx = size === 'BIG' ? '36px' : size === 'MEDIUM' ? '24px' : '20px'

  const avatarImageStyle: ImageType.StyleAttributes = {
    height: squarePx,
    width: squarePx,
    margin: '0',
    padding: '0',
    radius: '4px',
  }

  const handleAvatarClick = () => {
    if (clickable) setProfileModalVisible(true)
  }
  const handleProfileModalClose = () => setProfileModalVisible(false)

  return (
    <Styled.Wrapper>
      <A.Image
        customStyle={avatarImageStyle}
        url={profileImageUrl}
        onClick={handleAvatarClick}
      />
      {profileModalVisible && (
        <O.UserProfileModal
          user={user}
          modalAttributes={{ position: 'absolute', left: '120%', top: '0' }}
          onMessageButtonClick={onMessageButtonClick}
          onClose={handleProfileModalClose}
        />
      )}
    </Styled.Wrapper>
  )
}

Avatar.defaultProps = {}

export default Avatar
