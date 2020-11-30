import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ResultListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
  padding: 10px 0;
  border-bottom: 1px solid rgb(230, 230, 230);
`

const ResultListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default {
  Wrapper,
  ResultListHeaderWrapper,
  ResultListWrapper,
}
