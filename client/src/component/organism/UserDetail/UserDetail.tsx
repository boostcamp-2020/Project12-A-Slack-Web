import React from 'react'
import A from '@atom'
import M from '@molecule'
import O from '@organism'
import { TextType } from '@atom/Text'
import { ImageType } from '@atom/Image'
import { ButtonType } from '@atom/Button'
import { UserDetailProps } from '.'
import Styled from './UserDetail.style'

const UserDetail = ({ user }: UserDetailProps) => {
  const { email, name, profileImageUrl } = user

  const handleMessageButtonClick = () => {
    // TODO: DM 생성
  }

  return (
    <Styled.Wrapper>
      <Styled.UpperWrapper>
        <A.Image customStyle={profileImageStyle} url={profileImageUrl} />
        <A.Text customStyle={nameTextStyle}>{name}</A.Text>
        <M.ButtonDiv
          buttonStyle={messageButtonStyle}
          textStyle={messageButtonTextStyle}
          onClick={handleMessageButtonClick}
        >
          Message
        </M.ButtonDiv>
      </Styled.UpperWrapper>

      <Styled.LowerWrapper>
        <Styled.LabelGroupWrapper>
          <A.Text customStyle={labelTextStyle}>Display name</A.Text>
          <A.Text customStyle={contentTextStyle}>{name}</A.Text>
        </Styled.LabelGroupWrapper>

        <Styled.LabelGroupWrapper>
          <A.Text customStyle={labelTextStyle}>Email address</A.Text>
          <A.Text customStyle={{ ...contentTextStyle, color: 'blue' }}>
            {email}
          </A.Text>
        </Styled.LabelGroupWrapper>
      </Styled.LowerWrapper>
    </Styled.Wrapper>
  )
}

const profileImageStyle: ImageType.StyleAttributes = {
  width: '250px',
  height: '250px',
  radius: '5px',
  margin: '10px 0',
}

const nameTextStyle: TextType.StyleAttributes = {
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '3px 0',
}

const messageButtonStyle: ButtonType.StyleAttributes = {
  border: '1px solid lightgrey',
  hoverBackgroundColor: 'whiteGrey',
  padding: '8px 15px',
  margin: '10px 0 0 0',
}
const messageButtonTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  fontWeight: '500',
}

const labelTextStyle: TextType.StyleAttributes = {
  fontSize: '1.4rem',
  fontWeight: '500',
  color: 'darkGrey',
}
const contentTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
}

export default UserDetail
