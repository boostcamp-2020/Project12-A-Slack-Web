import styled from 'styled-components'
import color from '@constant/color'

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  padding: 10px 0;
  height: 100%;
`

const ReplyListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 16px 0 16px;
`
const Line = styled.hr`
  flex: 1;
`

const ReplyListContainer = styled.div`
  padding: 10px 0;
`

const EditorContainer = styled.div`
  height: 110px;
  width: 100%;
  padding: 0 16px 20px 16px;
  background-color: white;
  display: flex;
  justify-content: center;
`

const NoContentWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: grey;
  padding: 16px;
  &:hover {
    background-color: ${color.get('whiteHover')};
  }
`

export default {
  ThreadContainer,
  ReplyListHeader,
  Line,
  ReplyListContainer,
  EditorContainer,
  NoContentWrapper,
}
