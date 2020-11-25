import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import myAxios from '@util/myAxios'
import { createGlobalStyle } from 'styled-components'
import LoginPage from '@page/User/LoginPage'
import WorkspacePage from '@page/Workspace/WorkspacePage'
import A from '@atom'
import M from '@molecule'

const buttonStyle = {
  padding: '2rem',
  backgroundColor: 'lightBlue',
  hover: true,
}

const textStyle = {
  color: 'red',
  fontSize: '10rem',
}

const App = () => {
  const token = localStorage.getItem('token')
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const history = useHistory()

  const [_, accessToken] = window.location.search.split('=')
  if (accessToken) {
    localStorage.setItem('token', accessToken)
    window.location.href = '/'
  }

  type Response = {
    success: boolean
    message: string
  }

  const checkToken = async (): Promise<boolean | undefined> => {
    try {
      const { data } = await myAxios.get<Response>('/user/status')
      if (data.success) {
        setIsAuth(true)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        history.push('/login')
      }
      if (token) {
        try {
          await checkToken()
          history.push('/')
        } catch (err) {
          history.push('/login')
        }
      }
    }
    checkUser()
  }, [])

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={WorkspacePage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
      <A.Text customStyle={{ color: 'red' }}>text</A.Text>
      <A.Button customStyle={{ border: 'none' }}>A.Button</A.Button>
      <M.ButtonDiv
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        onClick={() => {
          alert('ButtonDiv Click')
        }}
      >
        M.ButtonDiv
      </M.ButtonDiv>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    width: 100vw;
  }
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    font-size: 62.5%;
  }
`

export default App
