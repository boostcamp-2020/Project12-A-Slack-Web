import styled from 'styled-components'

const WarnButtonTextContainer = styled.div`
  padding: 0.5rem 2rem;
  margin: 0;
  width: 100%;
  color: red;
  &:hover {
    color: white;
  }
  display: flex;
`

const PlainButtonTextContainer = styled.div`
  padding: 0.5rem 2rem;
  margin: 0;
  width: 100%;
  &:hover {
    color: white;
  }
  display: flex;
`

export default {
  WarnButtonTextContainer,
  PlainButtonTextContainer,
}
