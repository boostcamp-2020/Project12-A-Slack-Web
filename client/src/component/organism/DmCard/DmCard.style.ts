import styled from 'styled-components'

const DmCardImageContainer = styled.div`
  position: relative;
  height: 3rem;
  display: flex;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const DmCardContent = styled.div`
  display: flex;
  width: 100%;
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
  Container,
  DmCardImageContainer,
}
