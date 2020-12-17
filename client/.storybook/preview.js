import React from 'react'
import { createGlobalStyle } from 'styled-components'

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
export const decorators = [
  (Story) => (
    <div>
      <GlobalStyle />
      <Story />
    </div>
  ),
]
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
