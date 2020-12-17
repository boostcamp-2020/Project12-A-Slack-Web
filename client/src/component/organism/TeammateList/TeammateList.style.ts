import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1 1 0;
  overflow-y: scroll;
  margin-bottom: 15px;
`

const ResultListWrapper = styled.div`
  display: grid;
  gap: 13px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
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
  Wrapper,
  ResultListWrapper,
  NoResultsWrapper,
  SubViewHeaderWrapper,
}
