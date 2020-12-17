import styled from 'styled-components'

const InvitePeopleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const InvitePeopleTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`

const InputFormWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
`
const InvitePeopleInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
`

const InvitePeopleLink = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`

export default {
  InvitePeopleInput,
  InputFormWrapper,
  InvitePeopleContainer,
  InvitePeopleTitle,
  InvitePeopleLink,
}
