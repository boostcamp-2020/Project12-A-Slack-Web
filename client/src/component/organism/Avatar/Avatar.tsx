import React, { useState, MouseEvent } from 'react'
import A from '@atom'
import O from '@organism'
import { ImageType } from '@atom/Image'
import { ModalWrapperType } from '@atom/ModalWrapper'
import calcModalPosition from '@util/calcModalPosition'
import { AvatarProps } from '.'

import Styled from './Avatar.style'

const Avatar = ({
  user,
  size,
  clickable,
  avatarImageStyle,
  onMessageButtonClick,
}: AvatarProps) => {
  const { profileImageUrl } = user
  const [profileModalVisible, setProfileModalVisible] = useState(false)

  // eslint-disable-next-line no-nested-ternary
  const squarePx = size === 'BIG' ? '36px' : size === 'MEDIUM' ? '24px' : '20px'

  const defaultAvatarImageStyle: ImageType.StyleAttributes = {
    height: squarePx,
    width: squarePx,
    margin: '0',
    padding: '0',
    radius: '4px',
  }

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    if (clickable) {
      const [left, top] = calcModalPosition(340, 460, event, window)
      modalWrapperStyle.left = String(`${left}px`)
      modalWrapperStyle.top = String(`${top}px`)
      setProfileModalVisible(true)
    }
  }
  const handleProfileModalClose = () => setProfileModalVisible(false)

  return (
    <Styled.Wrapper>
      <A.Image
        customStyle={{ ...defaultAvatarImageStyle, ...avatarImageStyle }}
        url={profileImageUrl}
        onClick={handleAvatarClick}
      />
      {profileModalVisible && (
        <O.UserProfileModal
          user={user}
          modalAttributes={modalWrapperStyle}
          onMessageButtonClick={onMessageButtonClick}
          onClose={handleProfileModalClose}
        />
      )}
    </Styled.Wrapper>
  )
}

Avatar.defaultProps = {}

let modalWrapperStyle: ModalWrapperType.StyleAttributes = {
  zIndex: '999',
  position: 'fixed',
  left: '0',
  top: '50%',
}

export default Avatar
