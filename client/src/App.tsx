import React from 'react'
import { createGlobalStyle } from 'styled-components'
import A from '@atom/index'

const style = {
  backgroundColor: 'red',
}

const App = () => {
  return (
    <>
      <GlobalStyle />
      <A.Button customStyle={style}>버튼입니다.</A.Button>
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
`

export default App
