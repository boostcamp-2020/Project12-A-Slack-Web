import styled from 'styled-components'

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 2px 2px 2px 2px #dfdede;
  border-radius: 1rem;
`

const UserInfoWrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 2.5rem;
  border-bottom: 1px solid #c6c3c3;
`

const WorkspaceListWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default { ContentWrapper, UserInfoWrapper, WorkspaceListWrapper }
