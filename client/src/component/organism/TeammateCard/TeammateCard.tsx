import React from 'react'
import A from '@atom'
import { TextType } from '@atom/Text'
import { ImageType } from '@atom/Image'
import { TeammateCardProps } from '.'
import Styled from './TeammateCard.style'

const TeammateCard = ({ user, loginUserId, onClick }: TeammateCardProps) => {
  const { id, name, profileImageUrl } = user

  return (
    <Styled.Wrapper onClick={onClick}>
      <A.Image customStyle={profileImageStyle} url={profileImageUrl} />
      <Styled.BottomWrapper>
        <A.Text customStyle={nameTextStyle}>
          {name + (loginUserId === id ? ' (you)' : '')}
        </A.Text>
      </Styled.BottomWrapper>
    </Styled.Wrapper>
  )
}

const profileImageStyle: ImageType.StyleAttributes = {
  width: '100%',
  radius: '0',
}

const nameTextStyle: TextType.StyleAttributes = {
  fontSize: '1.7rem',
  fontWeight: 'bold',
  margin: '3px 0',
}

export default TeammateCard
