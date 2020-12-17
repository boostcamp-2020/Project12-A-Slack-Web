import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  border-right: 1px solid rgb(230, 230, 230);
  overflow-y: auto;
`

const ImageWrapper = styled.div`
  margin-top: 10px;
  border: 3px solid transparent;
  border-radius: 12px;
  padding: 2px;
  transition: all ease 0.5s 0s;
  &:hover {
    border: 3px solid #eef3f3;
    transition: all ease 0.5s 0s;
  }
`

const CurrentWorkspaceImageWrapper = styled.div`
  margin-top: 10px;
  border: 3px solid #cbd7d8;
  border-radius: 12px;
  padding: 2px;
`

export default {
  Wrapper,
  ImageWrapper,
  CurrentWorkspaceImageWrapper,
}
