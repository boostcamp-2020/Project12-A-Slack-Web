import styled from 'styled-components'

const ResultListWrapper = styled.div`
  flex: 1 1 0;
  overflow-y: scroll;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  margin-bottom: 20px;
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
  NoResultsWrapper,
  SubViewHeaderWrapper,
}
