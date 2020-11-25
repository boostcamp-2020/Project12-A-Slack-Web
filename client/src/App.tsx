import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import myAxios from '@util/myAxios'
import { createGlobalStyle } from 'styled-components'
import LoginPage from '@page/User/LoginPage'
import WorkspacePage from '@page/Workspace/WorkspacePage'

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
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    height: 100vh;
    width: 100vh;
    box-sizing: border-box;
    font-size: 62.5%;
    margin: 0 auto;
  }
  p{
    outline: none;
  }
`

export default App
