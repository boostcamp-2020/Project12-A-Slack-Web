import styled from 'styled-components'

const ChannelMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: content-box;
  height: 100%;
`
const ThreadListContainer = styled.div`
  padding: 10px 0 0 0;
  flex: 1 1 0;
  overflow-y: auto;
  overflow-x: hidden;
`
const EditorContainer = styled.div`
  height: 110px;
  flex: 0 0 110px;
  width: 100%;
  padding: 0 16px;
  background-color: white;
`

const ThreadSubViewHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const ChannelNameWrapper = styled.div`
  display: flex;
`

const ThreadListTop = styled.div`
  display: flex;
  padding: 16px;
  min-height: 100px;
`
const ThreadTypeIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  background-color: #f9f5ef;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-right: 10px;
`
const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ThreadListBottom = styled.div`
  width: 100%;
  height: 15px;
`

export default {
  ChannelMainContainer,
  ThreadListContainer,
  EditorContainer,
  ThreadSubViewHeaderWrapper,
  ChannelNameWrapper,
  ThreadListTop,
  ThreadTypeIconWrapper,
  ColumnFlexContainer,
  ThreadListBottom,
}
