import styled from 'styled-components'

const EachChannelContainer = styled.div`
  width: 200px;
  hieght: 35px;
  display: flex;
  justify-content: start;
  align-items: center;
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

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const SectionHoverContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SectionClickModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 5px;
`

const SectionHeader = styled.div`
  width: 100%;
  padding: 7px 5px;
  cursor: pointer;
`

const SectionChannelContainer = styled.div`
  width: 100%;
`

export default {
  SectionContainer,
  SectionHeader,
  SectionChannelContainer,
  SectionHoverContainer,
  SectionClickModalContent,
  CreateModalContainer,
  CreateHeader,
  CreateBottom,
  CreateFooter,
  CheckBoxWrapper,
  CheckBox,
  CheckBoxLabel,
  EachChannelContainer,
}
