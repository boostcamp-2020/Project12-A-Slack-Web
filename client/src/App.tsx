import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import {
  WorkspaceBrowserPage,
  WorkspaceJoinPage,
  NewWorkspacePage,
  WorkspacePage,
  LoginPage,
} from '@page'
import { GRANTED } from '@constant/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from '@hoc/Auth'

const App = () => {
  if (Notification.permission !== GRANTED) Notification.requestPermission()
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(WorkspaceBrowserPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, true)} />
          <Route
            exact
            path="/workspace/join"
            component={Auth(WorkspaceJoinPage, false)}
          />
          <Route
            exact
            path="/workspace/new"
            component={Auth(NewWorkspacePage, false)}
          />
          <Route
            path="/workspace/:workspaceId"
            component={Auth(WorkspacePage, false)}
          />
        </Switch>
      </Router>
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
  a {
    text-decoration: none;
  }
`

export default App
