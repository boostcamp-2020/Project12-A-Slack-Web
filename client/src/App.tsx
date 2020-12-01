import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import checkUserToken from '@api/user'
import { WorkspaceJoinPage, ChannelPage, LoginPage, WorkspacePage } from '@page'

const App = () => {
  const token = localStorage.getItem('token')
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const history = useHistory()

  const [name, accessToken] = window.location.search.split('=')

  if (accessToken && name === '?access_token') {
    localStorage.setItem('token', accessToken)
    window.location.href = '/'
  }

  const checkToken = async (): Promise<boolean> => {
    try {
      const { success } = await checkUserToken()
      if (success) {
        setIsAuth(true)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

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

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={WorkspacePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/workspace_join" component={WorkspaceJoinPage} />
          <Route exact path="/channel" component={ChannelPage} />
        </Switch>
      </Router>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    font-size: 62.5%;
  }
`

export default App
