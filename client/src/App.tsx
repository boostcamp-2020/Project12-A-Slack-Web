import React from 'react'
import { createGlobalStyle } from 'styled-components'

const App = () => {
  return (
    <>
      <GlobalStyle />
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
  }
`

export default App
