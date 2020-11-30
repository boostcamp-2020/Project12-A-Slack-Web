import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  border: 1px solid lightgrey;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  background-color: white;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

export default {
  Container,
  ButtonWrapper,
}
