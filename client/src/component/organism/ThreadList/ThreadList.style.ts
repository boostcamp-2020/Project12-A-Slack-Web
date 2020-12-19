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
const GuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid lightgrey;
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
  min-height: 110px;
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
const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 600;
`

const ThreadListBottom = styled.div`
  width: 100%;
  height: 15px;
`

export default {
  ChannelMainContainer,
  ThreadListContainer,
  EditorContainer,
  GuideWrapper,
  ThreadSubViewHeaderWrapper,
  ChannelNameWrapper,
  ThreadListTop,
  ThreadTypeIconWrapper,
  ColumnFlexContainer,
  LoadingWrapper,
  ThreadListBottom,
}
