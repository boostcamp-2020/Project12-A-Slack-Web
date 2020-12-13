import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  padding: 25px;
  height: 100%;
`

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`

const LowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export default {
  Wrapper,
  UpperWrapper,
  LowerWrapper,
  LabelGroupWrapper,
}
