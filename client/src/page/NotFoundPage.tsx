import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundPage = () => {
  return (
    <StyledContainer>
      <Link to="/">Home</Link>
      <p>404 Not Found</p>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  // background-color: red;
`

export default NotFoundPage
