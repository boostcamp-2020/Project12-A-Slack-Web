import styled from 'styled-components'
import color from '@constant/color'

const Wrapper = styled.div`
  box-sizing: content-box;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 35px 10px 35px;
`

const MemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const MemberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 35px;
  &:hover {
    background-color: ${color.get('whiteHover')};
  }
`
const MemberLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`

const EmptyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

export default {
  Wrapper,
  UpperWrapper,
  MemberListWrapper,
  MemberWrapper,
  MemberLeftWrapper,
  EmptyListWrapper,
}
