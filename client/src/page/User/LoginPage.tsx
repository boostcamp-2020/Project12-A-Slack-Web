import React from 'react'
import M from '@molecule'

const LoginPage = () => {
  return (
    <a href="http://localhost:3000/api/user/oauth/google">
      <M.ButtonDiv>구글로그인</M.ButtonDiv>
    </a>
  )
}

export default LoginPage
