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
  border-right: 1px solid rgb(230, 230, 230);
`

const WorkSpacePart = styled.div`
  border-bottom: 1px solid rgb(230, 230, 230);
  height: 60px;
`

const OtherPagePart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`

const SectionChannelPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const DirectMessagePart = styled.div``

const WorkspaceTitleWrapper = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export default {
  WorkspaceTitleWrapper,
  SideBarContainer,
  WorkSpacePart,
  OtherPagePart,
  SectionChannelPart,
  ScrollContainer,
  DirectMessagePart,
}
