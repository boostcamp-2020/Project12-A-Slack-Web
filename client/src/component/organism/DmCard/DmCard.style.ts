import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const DmCardMain = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
`

const DmCardContent = styled.div`
  display: flex;
  height: 100%;
  //   align-items: center;
`

const dmCardButtonStyle = {
  padding: '10px',
  display: 'flex',
  borderRadius: '10px',
  border: '1px solid rgb(230, 230, 230)',
  backgroundColor: 'white',
  hoverBackgroundColor: 'whiteGrey',
}

const dmDateTimeStyle = {
  fontSize: '12px',
  color: 'grey',
  fontWeight: 'bold',
}

const dmPeopleName = {
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0px 0px 0px 5px',
}

const dmDateTextStyle = {
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '0px 0px 8px 5px',
}

export default {
  dmDateTextStyle,
  dmPeopleName,
  dmDateTimeStyle,
  dmCardButtonStyle,
  DmCardContent,
  DmCardMain,
  Container,
}
