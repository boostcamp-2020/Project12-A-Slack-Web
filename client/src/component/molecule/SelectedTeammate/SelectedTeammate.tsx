import React from 'react'
import A from '@atom'
import M from '@molecule'
import { ImageType } from '@atom/Image'
import { TextType } from '@atom/Text'
import { SelectedTeammateProps } from '.'

import Styled from './SelectedTeammate.style'

const SelectedTeammate = ({ user, onDeleteClick }: SelectedTeammateProps) => {
  const { name, profileImageUrl } = user
  return (
    <Styled.Wrapper>
      <A.Image customStyle={userImageStyle} url={profileImageUrl} />

      <A.Text customStyle={nameTextStyle}>{name}</A.Text>

      <M.CloseButton onClick={onDeleteClick} />
    </Styled.Wrapper>
  )
}

const userImageStyle: ImageType.StyleAttributes = {
  height: '100%',
  radius: '0',
  margin: '0 8px 0 0',
}

const nameTextStyle: TextType.StyleAttributes = {
  fontSize: '1.8rem',
  fontWeight: '600',
}

export default SelectedTeammate
