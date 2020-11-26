import React from 'react'
import A from '@atom'
import M from '@molecule'
import { IconType } from '@atom/Icon'
import { ButtonType } from '@atom/Button'
import { TextType } from '@atom/Text'
import myIcon from '@constant/icon'
import { HeaderInputProps } from '.'
import Styled from './HeaderInput.style'

const HeaderInput = ({ onClick }: HeaderInputProps) => {
  return (
    <Styled.Container>
      <A.Icon icon={myIcon.clock} customStyle={IconFirstStyle} />
      <M.ButtonDiv
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        onClick={onClick}
      >
        <>
          <A.Icon icon={myIcon.search} customStyle={IconSecondStyle} />
          Search 부스트캠프 멤버쉽 2020
        </>
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

const IconSecondStyle: IconType.StyleAttributes = {
  color: 'white',
  fontSize: '12px;',
  margin: '0px 10px 0px 0px;',
}

const IconThirdStyle: IconType.StyleAttributes = {
  color: 'white',
  fontSize: '15px;',
  margin: '3px 0px 0px 15px;',
}

const buttonStyle: ButtonType.StyleAttributes = {
  width: '40vh',
  padding: '2px 0px 2px 0px',
  backgroundColor: 'lightBlue',
  border: '1px solid white',
}

const textStyle: TextType.StyleAttributes = {
  color: 'white',
  fontSize: '1.2rem',
}

export default HeaderInput
