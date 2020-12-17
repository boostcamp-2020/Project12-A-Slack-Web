import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`

const DmCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const DmCardFirstSection = styled.div`
  display: flex;
`

const DmCardSecondSection = styled.div``

const DmCardImageContainer = styled.div`
  position: relative;
  height: 3rem;
  display: flex;
`

export default {
  DmCardContent,
  Container,
  DmCardImageContainer,
  DmCardSecondSection,
  DmCardFirstSection,
}
