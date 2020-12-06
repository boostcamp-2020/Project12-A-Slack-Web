import styled from 'styled-components'

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
}
