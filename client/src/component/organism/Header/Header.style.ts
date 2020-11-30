import styled from 'styled-components'

const HeaderProfileRightContainer = styled.div`
  position: relative;
`

const ProfileModalContainerFirst = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
`

const ProfileInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ProfileModalContainerSecond = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileModalContainerThird = styled.div`
  border-bottom: 1px solid lightgrey;
`

const StyledHeaderContainer = styled.div`
  background-color: #1f57e7;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const ModalInputContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
`

// TODO: A.Input 으로 대체하기
const StyledInput = styled.input`
  border: none;
  width: 500px;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  color: #616061;
`

const LookingForDiv = styled.div`
  padding: 10px;
  font-size: 12px;
  color: #616061;
`

const ButtonContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  width: 500px;
  height: 50px;
`
export default {
  ProfileModalContainerFirst,
  ProfileInContainer,
  ProfileModalContainerSecond,
  ProfileModalContainerThird,
  StyledHeaderContainer,
  ModalInputContainer,
  StyledInput,
  LookingForDiv,
  ButtonContainer,
  HeaderProfileRightContainer,
}
