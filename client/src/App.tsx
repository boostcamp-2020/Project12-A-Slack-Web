import React from 'react'
import { createGlobalStyle } from 'styled-components'
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
  return (
    <>
      <GlobalStyle />

      <A.Button customStyle={{ border: 'none' }}>A.Button</A.Button>

      <M.Modal
        overlayStyle={{ opacity: '0.05' }}
        modalWrapperStyle={{
          top: '30%',
          right: '20%',
          left: '20%',
          height: '200px',
          padding: '10px',
        }}
      >
        <M.ButtonDiv
          buttonStyle={buttonStyle}
          textStyle={textStyle}
          onClick={() => {
            alert('ButtonDiv Click')
          }}
        >
          This is Modal Children
        </M.ButtonDiv>
      </M.Modal>
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
