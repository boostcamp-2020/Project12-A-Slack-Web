import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import A from '@atom'
import myIcon from '@constant/icon'

const NotFoundPage = ({ url }: { url?: string }) => {
  const link = url === '/' ? 'To Home' : 'To Channel Browser'
  return (
    <StyledContainer>
      <A.Icon icon={myIcon.frown} customStyle={{ fontSize: '8rem' }} />
      <Title>404 Not Found</Title>
      <Desc>Hello I'm slack! </Desc>
      <Desc>
        The page you are looking for doesn't exist or an the other error
        occurred.
      </Desc>

      <Link to={`${url}`}>
        <Home>{link}</Home>
      </Link>
    </StyledContainer>
  )
}

NotFoundPage.defaultProps = {
  url: '/',
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 10px 0;
`
const Desc = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: grey;
`
const Home = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 15px;
`

export default NotFoundPage
