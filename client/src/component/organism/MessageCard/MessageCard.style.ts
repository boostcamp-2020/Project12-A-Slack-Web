import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  &:hover {
    background-color: #f8f8f8;
  }
`
const ImageWrapper = styled.div`
  height: 36px;
  width: 36px;
  flex-shrink: 0;
  margin-right: 8px;
  display: flex;
`
const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e3e3e4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`
const TextWrapper = styled.div`
  flex: 1 1 0;
  min-width: 0;
  padding: 8px;
  padding-left: 16px;
  margin: -12px -8px -16px -16px;
  overflow-wrap: break-word;
`
const ContentWrapper = styled.div`
  width: 100%;
  max-width: none;
  margin-bottom: 4px;
  overflow-wrap: break-word;
`

const ActionBarWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: 1rem;
`

export default {
  Container,
  ImageWrapper,
  IconWrapper,
  TextWrapper,
  ContentWrapper,
  ActionBarWrapper,
}
