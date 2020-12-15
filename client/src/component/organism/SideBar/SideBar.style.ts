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
  display: flex;
  align-items: center;
  padding: 0 20px;
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

export default {
  SideBarContainer,
  WorkSpacePart,
  OtherPagePart,
  SectionChannelPart,
  ScrollContainer,
}
