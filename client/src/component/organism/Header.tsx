import React from 'react'
import styled from 'styled-components'
import A from '@atom'
import M from '@molecule'

const StyledHeaderContainer = styled.div`
  background-color: #1f57e7;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const headerImageStyle = {
  margin: '0px 10px 0px 0px',
  height: '2.5rem',
  width: '2.5rem',
  radius: '4px',
  cursor: 'pointer',
}

const Header = () => {
  const handleSearchBarClick = () => {
    alert('Search bar clicked!')
  }
  const handleProfileClick = () => {
    alert('Profile clicked!')
  }
  return (
    <StyledHeaderContainer>
      <M.HeaderInput onClick={handleSearchBarClick} />
      <A.Image customStyle={headerImageStyle} onClick={handleProfileClick} />
    </StyledHeaderContainer>
  )
}

export default Header
