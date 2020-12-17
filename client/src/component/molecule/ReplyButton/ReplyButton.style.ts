import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 34px;
  margin: 4px 0 -2px -5px;
  display: flex;
  align-items: center;
  max-width: 600px;
  padding: 4px;
  font-size: 13px;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    border-color: rgba(97, 96, 97, 0.13);
    background-color: white;
  }
`
const ImageWrapper = styled.div`
  margin-right: 4px;
  flex-shrink: 0;
  display: flex;
`
const CountTextWrapper = styled.div`
  margin-left: 3px;
  flex-shrink: 0;
`
const TimeTextWrapper = styled.div`
  margin-left: 8px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Arrow = styled.div`
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  display: inline-block;
  color: #868686;
  margin-left: auto;
  margin-right: 10px;
`

export default {
  Container,
  ImageWrapper,
  CountTextWrapper,
  TimeTextWrapper,
  Arrow,
}
