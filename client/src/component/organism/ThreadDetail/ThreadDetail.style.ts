import styled from 'styled-components'
import color from '@constant/color'

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  padding: 10px 0 0 0;
  height: 100%;
  overflow: auto;
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
  padding: 10px 0 0 0;
  flex: 1 1 0;
  overflow-y: auto;
  overflow-x: hidden;
`

const EditorContainer = styled.div`
  height: 110px;
  flex: 0 0 110px;
  width: 100%;
  padding: 0 20px;
  background-color: white;
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
