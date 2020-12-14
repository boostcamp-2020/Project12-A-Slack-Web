import styled from 'styled-components'
import color from '@constant/color'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
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

const MemberCountWrapper = styled.div`
  font-size: 1.4rem;
  width: 25px;
  &:hover {
    background-color: ${color.get('whiteHover')};
  }
`

const DMMemberCountBox = styled.div`
  border-radius: 4px;
  background-color: ${color.get('darkGrey')};
  color: white;
  width: 14px;
  height: 14px;
  padding: 2px;
  margin-right: 2px;
  text-align: center;
  font-weight: 600;
`

export default {
  Wrapper,
  LeftWrapper,
  RightWrapper,
  MemberCountWrapper,
  DMMemberCountBox,
}
