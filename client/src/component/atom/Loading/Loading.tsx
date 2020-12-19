import React from 'react'
import styled, { keyframes } from 'styled-components'
import myColor from '@constant/color'

const bounce = keyframes`
  0% {
    transform: scale(1)
  }
  50% {
    transform: scale(0)
  }
  100% {
    transform: scale(1)
  }
`

const Circle = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ color }) => myColor.get(color)};
  animation: ${bounce} 1s infinite;
`

const Loading = ({ color }: { color: string }) => {
  return <Circle color={color} />
}

export default Loading
