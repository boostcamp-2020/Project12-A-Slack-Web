import styled from 'styled-components'

const Container = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  border: 1px solid #868686;
  border-radius: 4px;
  overflow: auto;
  min-height: 22px;
`

const ButtonWrapper = styled.div`
  height: 41px;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 1px solid #e3e3e4;
`
const LeftButtonWrapper = styled.div``
const RightButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default {
  Container,
  ButtonWrapper,
  LeftButtonWrapper,
  RightButtonWrapper,
}
