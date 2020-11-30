import React from 'react'
import A from '@atom'
import M from '@molecule'
import { TextType } from '@atom/Text'
import { ButtonType } from '@atom/Button'
import { ModalWrapperType } from '@atom/ModalWrapper'
import { ImageType } from '@atom/Image'
import { UserProfileModalProps } from '.'
import Styled from './UserProfileModal.style'

const UserProfileModal = ({
  user,
  modalAttributes,
  onMessageButtonClick,
  onClose,
}: UserProfileModalProps) => {
  const { id, email, name, profileImageUrl } = user

  return (
    <M.Modal
      modalWrapperStyle={{ ...modalWrapperStyle, ...modalAttributes }}
      disableCloseButton
      onClose={onClose}
    >
      <Styled.Wrapper>
        <A.Image customStyle={profileImageStyle} url={profileImageUrl} />
        <Styled.BottomWrapper>
          <A.Text customStyle={nameTextStyle}>{name}</A.Text>
          <A.Text customStyle={emailTextStyle}>{email}</A.Text>
          <M.ButtonDiv
            buttonStyle={messageButtonStyle}
            onClick={onMessageButtonClick}
          >
            Message
          </M.ButtonDiv>
        </Styled.BottomWrapper>
      </Styled.Wrapper>
    </M.Modal>
  )
}

const modalWrapperStyle: ModalWrapperType.StyleAttributes = {
  width: 'auto',
  padding: '0',
  backgroundColor: 'white',
  border: '1px solid lightGrey',
  borderRadius: '8px',
  overflow: 'hidden',
}

const profileImageStyle: ImageType.StyleAttributes = {
  width: '300px',
  height: '300px',
  radius: '0',
}

const messageButtonStyle: ButtonType.StyleAttributes = {
  border: '1px solid lightgrey',
  hoverBackgroundColor: 'whiteGrey',
}

const nameTextStyle: TextType.StyleAttributes = {
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '3px 0',
}

const emailTextStyle: TextType.StyleAttributes = {
  fontSize: '14.5px',
  color: 'blue',
  margin: '0 0 15px 0',
}

export default UserProfileModal
