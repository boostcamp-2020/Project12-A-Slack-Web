import React from 'react'
import { createGlobalStyle } from 'styled-components'
import A from '@atom'
import M from '@molecule'

const buttonStyle = {
  height: '10rem',
  width: '20rem',
  backgroundColor: 'red',
}

const App = () => {
  return (
    <>
      <GlobalStyle />
      <M.ButtonDiv buttonStyle={buttonStyle}>ddd</M.ButtonDiv>
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
