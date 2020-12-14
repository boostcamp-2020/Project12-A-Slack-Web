import React from 'react'
import A from '@atom'
import M from '@molecule'
import { IconType } from '@atom/Icon'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import myIcon from '@constant/icon'
import { HeaderInputProps } from '.'
import Styled from './HeaderInput.style'

const HeaderInput = ({ workspaceName }: HeaderInputProps) => {
  return (
    <Styled.Container>
      <A.Icon icon={myIcon.clock} customStyle={IconFirstStyle} />
      <M.ButtonDiv buttonStyle={buttonStyle} textStyle={textStyle}>
        {workspaceName}
      </M.ButtonDiv>
      <A.Icon icon={myIcon.question} customStyle={IconThirdStyle} />
    </Styled.Container>
  )
}

HeaderInput.defaultProps = {}

const IconFirstStyle: IconType.StyleAttributes = {
  color: 'white',
  fontSize: '15px;',
  margin: '3px 15px 0px 0px;',
}

const IconThirdStyle: IconType.StyleAttributes = {
  color: 'white',
  fontSize: '15px;',
  margin: '3px 0px 0px 15px;',
}

const buttonStyle: ButtonType.StyleAttributes = {
  width: '500px',
  padding: '2px 0px 2px 0px',
  backgroundColor: 'lightBlue',
  hoverBackgroundColor: 'lightGrey',
}

const textStyle: TextType.StyleAttributes = {
  color: 'white',
  fontSize: '1.3rem',
}

export default HeaderInput
