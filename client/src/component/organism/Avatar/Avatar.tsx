import React, { useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '@store'
import A from '@atom'
import O from '@organism'
import { ImageType } from '@atom/Image'
import { ModalWrapperType } from '@atom/ModalWrapper'
import calcModalPosition from '@util/calcModalPosition'
import { createDM } from '@store/reducer/channel.reducer'
import { AvatarProps } from '.'

import Styled from './Avatar.style'

const Avatar = ({ user, size, clickable, avatarImageStyle }: AvatarProps) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useSelector((state: RootState) => state.userStore)
  const { id: workspaceId } = useSelector(
    (state: RootState) => state.workspaceStore.currentWorkspace,
  )
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

  const handleMessageButtonClick = () => {
    const onSuccess = (channelId: number) => {
      history.push(`/workspace/${workspaceId}/channel/${channelId}`)
    }
    dispatch(
      createDM.request({
        name: `${currentUser.name}, ${user.name}`,
        type: 'DM',
        workspaceId,
        userList: [currentUser, user],
        onSuccess,
      }),
    )
  }

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
          onMessageButtonClick={handleMessageButtonClick}
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
