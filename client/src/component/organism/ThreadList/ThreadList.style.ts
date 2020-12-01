import styled from 'styled-components'

const ChannelMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-end;
  position: relative;
  box-sizing: content-box;
  height: 100%;
`
const ThreadListContainer = styled.div`
  height: 82%;
  overflow-y: auto;
  overflow-x: hidden;
`
const EditorContainer = styled.div`
  height: 18%;
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0;
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

export default {
  ChannelMainContainer,
  ThreadListContainer,
  EditorContainer,
  ThreadSubViewHeaderWrapper,
  ChannelNameWrapper,
}
