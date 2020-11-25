import React from 'react'
import styled from 'styled-components'
import Icon from '@atom/Icon'
import myIcon from '@constant/icon'

const StyledHeader = styled.div`
  background-color: #1f57e7;
  height: 2.5vh;
  width: 35vh;
  display: flex;
  justify-content: space-around;
`

const myIconStyle = {
  // color: 'white',
  // fontSize: '20px;',
  // fontWeight: 'normal;',
}

const Header = () => {
  return (
    <StyledHeader>
      <Icon icon={myIcon.clock} customStyle={myIconStyle} />
      <Icon icon={myIcon.question} customStyle={myIconStyle} />
      <Icon icon={myIcon.search} customStyle={myIconStyle} />
    </StyledHeader>
  )
}

export default Header
