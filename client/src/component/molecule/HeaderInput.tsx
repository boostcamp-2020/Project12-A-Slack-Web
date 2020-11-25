import React from 'react'
import styled from 'styled-components'
import MyIcon from '@atom/MyIcon'
import myIcon from '@constant/icon'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

const StyledHeader = styled.div`
  background-color: blue;
  height: 3.5vh;
  display: flex;
  justify-content: space-around;
`

interface IconStyle {
  color: string
  size: SizeProp
}

const myIconStyle: IconStyle = {
  color: 'red',
  size: '9x',
}

const Header = () => {
  return (
    <StyledHeader>
      <MyIcon
        icon={myIcon.clock}
        color={myIconStyle.color}
        size={myIconStyle.size}
      />
      <MyIcon
        icon={myIcon.question}
        color={myIconStyle.color}
        size={myIconStyle.size}
      />
      <MyIcon
        icon={myIcon.search}
        color={myIconStyle.color}
        size={myIconStyle.size}
      />
    </StyledHeader>
  )
}

export default Header
