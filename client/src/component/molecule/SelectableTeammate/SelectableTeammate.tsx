import React from 'react'
import A from '@atom'
import { ImageType } from '@atom/Image'
import { TextType } from '@atom/Text'
import myIcon from '@constant/icon'
import { SelectableTeammateProps } from '.'

import Styled from './SelectableTeammate.style'

const SelectableTeammate = ({
  user,
  onTeammateClick,
  alreadyInChannel,
  selected,
}: SelectableTeammateProps) => {
  const { name, email, profileImageUrl } = user

  return (
    <Styled.Wrapper onClick={onTeammateClick}>
      {selected && (
        <Styled.CheckIconWrapper>
          <A.Icon icon={myIcon.check} customStyle={{ fontSize: '1rem' }} />
        </Styled.CheckIconWrapper>
      )}
      <Styled.UserWrapper>
        <A.Image url={profileImageUrl} customStyle={profileImageStyle} />
        <A.Text customStyle={teammateNameTextStyle}>{name}</A.Text>
        <A.Text customStyle={teammateEmailTextStyle}>{email}</A.Text>
      </Styled.UserWrapper>
      {alreadyInChannel && (
        <A.Text customStyle={alreadyInTextStyle}>
          Already in this channel
        </A.Text>
      )}
    </Styled.Wrapper>
  )
}

const profileImageStyle: ImageType.StyleAttributes = {
  height: '20px',
}

const teammateNameTextStyle: TextType.StyleAttributes = {
  fontSize: '1.5rem',
  margin: '0 0 0 10px',
  fontWeight: '600',
}
const teammateEmailTextStyle: TextType.StyleAttributes = {
  fontSize: '1.4rem',
  margin: '0 0 0 10px',
}

const alreadyInTextStyle: TextType.StyleAttributes = {
  fontSize: '1.3rem',
  color: 'darkGrey',
}

export default SelectableTeammate
