import styled from 'styled-components'

const ToggleButton = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  background-color: #2196f3;
  &:focus {
    box-shadow: 0 0 1px #2196f3;
  }
`

const ToggleSlider = styled.span`
  background-color: #2196f3;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    transform: translateX(26px);
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }
`

const CreateModalContainer = styled.div`
  height: 100%;
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
  width: 200px;
  padding: 5px;
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
  ToggleButton,
  ToggleInput,
  ToggleSlider,
}
