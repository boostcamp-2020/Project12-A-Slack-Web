import styled from 'styled-components'

const ResultListWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
`
const CardWrapper = styled.div`
  margin: 0 12px 12px 0;
  cursor: pointer;
`

const NoResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 22rem;
`

// TODO: 중복되는 style 선언 정리
const SubViewHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export default {
  ResultListWrapper,
  CardWrapper,
  NoResultsWrapper,
  SubViewHeaderWrapper,
}
