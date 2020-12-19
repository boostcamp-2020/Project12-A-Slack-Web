import styled from 'styled-components'

const EachChannelContainer = styled.div`
  width: 200px;
  height: 35px;
  display: flex;
  justify-content: start;
  align-items: center;
`

const InputWrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  margin: 0.5rem 0;
`

const InputFormWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
`

const CheckBoxWrapper = styled.div`
  position: relative;
`
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 50px;
  height: 30px;
  &:checked + ${CheckBoxLabel} {
    background: #007a5a;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`

const CreateModalContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
`

const CreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CreateBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CreateFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const ErrorTextWrapper = styled.div`
  width: 100%;
  height: 2rem;
  padding: 1rem 0;
`

export default {
  CreateModalContainer,
  ErrorTextWrapper,
  InputFormWrapper,
  InputWrapper,
  CreateHeader,
  CreateBottom,
  CreateFooter,
  CheckBoxWrapper,
  CheckBox,
  CheckBoxLabel,
  EachChannelContainer,
  FlexColumn,
}
