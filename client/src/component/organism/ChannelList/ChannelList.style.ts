import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  height: 100%;
`

const HeaderWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
`

const ResultListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 0;
  border-bottom: 1px solid rgb(230, 230, 230);
`

const ResultListWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

export default {
  Wrapper,
  HeaderWrapper,
  ResultListHeaderWrapper,
  ResultListWrapper,
}
