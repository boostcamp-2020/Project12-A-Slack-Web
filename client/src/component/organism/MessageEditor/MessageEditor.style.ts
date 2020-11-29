import styled from 'styled-components'

const Container = styled.div`
  width: auto;
  height: auto;
  padding-left: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #868686;
  border-radius: 8px;
  overflow: auto;
  min-height: 22px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LeftButtonWrapper = styled.div``
const RightButtonWrapper = styled.div``

export default {
  Container,
  ButtonWrapper,
  LeftButtonWrapper,
  RightButtonWrapper,
}
