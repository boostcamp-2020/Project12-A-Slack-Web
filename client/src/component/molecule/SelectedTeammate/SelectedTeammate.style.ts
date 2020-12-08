import styled from 'styled-components'

const Wrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  padding: 0;
  height: 35px;
  width: fit-content;
  overflow: hidden;
  background-color: #eff9f9;
  border: 1px solid #eff9f9;
  border-radius: 4px;
  &:hover {
    border: 1px solid skyblue;
  }
`

export default {
  Wrapper,
}
