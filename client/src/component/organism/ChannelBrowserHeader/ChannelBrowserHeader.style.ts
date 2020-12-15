import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const CreateModalContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`
const CreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

const CreateBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

const CreateFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
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
    background: #1f57e7;
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

export default {
  Wrapper,
  CreateModalContainer,
  CreateHeader,
  CreateBottom,
  CreateFooter,
  CheckBoxWrapper,
  CheckBox,
  CheckBoxLabel,
}
