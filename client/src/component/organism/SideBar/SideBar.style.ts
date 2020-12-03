import styled from 'styled-components'

const ScrollContainer = styled.div`
  height: 85vh;
  overflow-y: scroll;
`

const SideBarContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: #ffffff;
  border-top: 1px solid rgb(230, 230, 230);
  border-left: 1px solid rgb(230, 230, 230);
  border-right: 1px solid rgb(230, 230, 230);
`

const WorkSpacePart = styled.div`
  border-bottom: 1px solid rgb(230, 230, 230);
  height: 60px;
`

const OtherPagePart = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: column;
`

// TODO : height
const SectionChannelPart = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  // height: 550px;
  display: flex;
  flex-direction: column;
  // overflow-y: scroll;
`
const DirectMessagePart = styled.div``

export default {
  SideBarContainer,
  WorkSpacePart,
  OtherPagePart,
  SectionChannelPart,
  ScrollContainer,
  DirectMessagePart,
}
