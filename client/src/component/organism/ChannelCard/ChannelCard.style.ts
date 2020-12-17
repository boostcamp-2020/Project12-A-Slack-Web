import styled from 'styled-components'
import color from '@constant/color'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  height: 70px;
  padding: 15px;
  &:hover {
    background-color: ${color.get('whiteHover')};
  }
`

const ChannelInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ChannelSubTextWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`

export default {
  Wrapper,
  ChannelInfoWrapper,
  ChannelSubTextWrapper,
}
