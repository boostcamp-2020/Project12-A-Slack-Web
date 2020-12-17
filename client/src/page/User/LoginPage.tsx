import React from 'react'
import A from '@atom'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const LoginPage = () => {
  const serverURL =
    process.env.NODE_ENV === 'development'
      ? process.env.SERVER_DOMAIN_DEVELOP
      : process.env.SERVER_DOMAIN_PRODUCTION

  const history = useHistory()
  const handleClickSlackLogo = () => {
    history.push('/')
  }

  return (
    <LoginContainer>
      <LoginPageContentWrapper>
        <A.Image
          customStyle={slackImageStyle}
          url="https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg"
          onClick={handleClickSlackLogo}
        />
        <A.Text customStyle={slackLoginTextStyle}>Slack에 로그인</A.Text>
        <A.Text customStyle={slackLoginSubTextStyle}>
          로그인하려면 사용하는 Google 계정으로 계속해 주세요.
        </A.Text>
        <GoogleLoginButton href={`${serverURL}/api/user/oauth/google`}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            style={{ width: '2.3rem' }}
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </g>
          </svg>

          <A.Text customStyle={googleLoginTextStyle}>Google로 계속</A.Text>
        </GoogleLoginButton>
      </LoginPageContentWrapper>
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

const LoginPageContentWrapper = styled.div`
  width: 40%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

const GoogleLoginButton = styled.a`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  border: 2px solid #4285f4;
  border-radius: 5px;
  text-decoration: none;
  &:link {
    color: #4285f4;
  }
  &:visited {
    color: #4285f4;
  }
`

const slackImageStyle = {
  height: '20%',
  width: '60%',
}

const slackLoginTextStyle = {
  height: '13%',
  width: 'auto',
  fontSize: '4rem',
  fontWeight: 'bold',
  display: 'block',
}

const slackLoginSubTextStyle = {
  height: '13%',
  width: 'auto',
  fontSize: '2.3rem',
  display: 'block',
  color: 'darkGrey',
}

const googleLoginTextStyle = {
  fontSize: '2rem',
  color: '#4285f4',
  margin: '1rem',
  fontWeight: 'bold',
}

export default LoginPage
