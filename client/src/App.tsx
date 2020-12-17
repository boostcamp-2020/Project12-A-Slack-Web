import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import {
  WorkspaceBrowserPage,
  WorkspaceJoinPage,
  NewWorkspacePage,
  WorkspacePage,
  LoginPage,
  NotFoundPage,
} from '@page'
import { GRANTED } from '@constant/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from '@hoc/Auth'
import PrivateWorkspace from '@hoc/PrivateWorkspace'

const App = () => {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  }
  if (!isMobile()) {
    if (Notification.permission !== GRANTED) Notification.requestPermission()
  }
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(WorkspaceBrowserPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, true)} />
          <Route exact path="/workspace/join" component={WorkspaceJoinPage} />
          <Route
            exact
            path="/workspace/new"
            component={Auth(NewWorkspacePage, false)}
          />
          <Route
            path="/workspace/:workspaceId"
            component={Auth(WorkspacePage, false)}
          />
          <Route component={NotFoundPage} />
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
  main {
    height: 100%;
    width: 100%;
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
