import styled from 'styled-components'

const Container = styled.div<{ editMode?: boolean }>`
  width: 100%;
  padding: 7px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  &:hover {
    ${({ editMode }) => (editMode ? '' : 'background-color: #f8f8f8;')};
  }
`
const AvatarWrapper = styled.div`
  width: 36px;
  flex-shrink: 0;
  margin-right: 8px;
  display: flex;
`
const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  background-color: #e3e3e4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`

const ContentWrapper = styled.div`
  flex: 1 1 0;
  min-width: 0;
  overflow-wrap: break-word;
`

const UserNameAndTimeWrapper = styled.div`
  margin: 0 0 3px 0;
`

const MessageWrapper = styled.div`
  width: 100%;
  max-width: none;
  overflow-wrap: break-word;
`
const NoContentWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`

const ActionBarWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: 1rem;
`

export default {
  Container,
  AvatarWrapper,
  IconWrapper,
  ContentWrapper,
  UserNameAndTimeWrapper,
  MessageWrapper,
  NoContentWrapper,
  ActionBarWrapper,
}
