import styled from 'styled-components'

// width: 250px + left: 0 이기 때문에 메인 페이지는 margin-left: 250px(==Sidebar width)이 필요
const SideBarContainer = styled.div`
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  left: 0;
  background-color: #ffffff;
  border-top: 1px solid rgb(230, 230, 230);
  border-left: 1px solid rgb(230, 230, 230);
  border-right: 1px solid rgb(230, 230, 230);
  overflow-x: hidden;
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
const SectionChannelPart = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const DirectMessagePart = styled.div``

export default {
  SideBarContainer,
  WorkSpacePart,
  OtherPagePart,
  SectionChannelPart,
  DirectMessagePart,
}
