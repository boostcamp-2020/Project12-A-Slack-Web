import styled from 'styled-components'

const Wrapper = styled.div<{ bottom: number; left: number }>`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  overflow: hidden;
  border: 1px solid rgba(97, 96, 97, 0.13);
  border-radius: 6px;
  background-color: black;
  color: white;
  position: fixed;
  bottom: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
  z-index: 100;
`

export default {
  Wrapper,
}
