import styled from 'styled-components'

const Wrapper = styled.div<{ bottom: number; left: number }>`
  position: fixed;
  bottom: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
  z-index: 100;
  display: flex;
`

const Box = styled.div`
  width: fit-content;
  height: fit-content;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border: 1px solid rgba(97, 96, 97, 0.13);
  border-radius: 6px;
  background-color: black;
  &::after {
    position: absolute;
    content: ' ';
    height: 0;
    z-index: -1;
    border-bottom: 12px solid;
    border-left: 10px solid rgba(0, 0, 0, 0);
    border-right: 10px solid rgba(0, 0, 0, 0);
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
  }
`

export default {
  Wrapper,
  Box,
}
