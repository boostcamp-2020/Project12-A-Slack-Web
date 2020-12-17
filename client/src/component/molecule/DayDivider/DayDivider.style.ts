import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid lightgrey;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`
const LabelWrapper = styled.div`
  position: absolute;
`

export default {
  Wrapper,
  LabelWrapper,
}
