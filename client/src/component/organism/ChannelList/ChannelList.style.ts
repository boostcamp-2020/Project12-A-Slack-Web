import styled from 'styled-components'

const ResultListWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

const NoResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 22rem;
`

export default {
  ResultListWrapper,
  NoResultsWrapper,
}
