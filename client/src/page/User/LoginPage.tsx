import React from 'react'
import M from '@molecule'
import styled from 'styled-components'

const LoginPage = () => {
  const serverURL =
    process.env.NODE_ENV === 'development'
      ? process.env.SERVER_DOMAIN_DEVELOP
      : process.env.SERVER_DOMAIN_PRODUCTION

  return (
    <LoginContainer>
      <a href={`${serverURL}/api/user/oauth/google`}>
        <M.ButtonDiv>구글로그인</M.ButtonDiv>
      </a>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default LoginPage
