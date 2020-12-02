import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import {
  WorkspaceJoinPage,
  ChannelPage,
  LoginPage,
  WorkspacePage,
  NewWorkspacePage,
} from '@page'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from '@hoc/Auth'

const App = () => {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(WorkspacePage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, true)} />
          <Route
            exact
            path="/workspace-join"
            component={Auth(WorkspaceJoinPage, false)}
          />
          <Route
            exact
            path="/new-workspace"
            component={Auth(NewWorkspacePage, false)}
          />
          <Route exact path="/channel" component={Auth(ChannelPage, false)} />
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
