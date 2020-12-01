import React from 'react'
import A from '@atom'
import { ButtonType } from '@atom/Button'
import myIcon from '@constant/icon'

import { CloseButtonProps } from '.'

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <A.Button customStyle={buttonStyle} onClick={onClick}>
      <A.Icon icon={myIcon.close} />
    </A.Button>
  )
}

const buttonStyle: ButtonType.StyleAttributes = {
  hoverBackgroundColor: 'whiteHover',
  width: '35px',
  height: '35px',
}

export default CloseButton
