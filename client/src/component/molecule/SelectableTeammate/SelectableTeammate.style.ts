import styled from 'styled-components'
import color from '@constant/color'

const Wrapper = styled.div`
  padding: 6px 23px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${color.get('blue')};
    color: white;
  }
  position: relative;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`

const CheckIconWrapper = styled.div`
  position: absolute;
  left: 7px;
`

export default {
  Wrapper,
  UserWrapper,
  CheckIconWrapper,
}
