import styled from 'styled-components'

const ChannelMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: content-box;
  height: 100%;
  border: 1px solid red;
`
const ThreadListContainer = styled.div`
  // height: 82%;
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
  // position: absolute;
  // bottom: 0;
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
