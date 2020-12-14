import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  max-height: 330px;
  min-height: 310px;
  padding: 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 8px;
  overflow: hidden;
`

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px;
`

export default {
  Wrapper,
  BottomWrapper,
}
