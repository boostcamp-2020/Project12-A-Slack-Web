import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  padding: 10px 20px;
`

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default {
  Wrapper,
  LeftWrapper,
  RightWrapper,
}
