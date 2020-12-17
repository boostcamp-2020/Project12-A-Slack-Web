import styled from 'styled-components'
import color from '@constant/color'

const Wrapper = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
`

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 35px 10px 35px;
`

const LowerInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 35px 30px 35px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
  min-height: 30px;
  max-height: 150px;
  overflow-y: auto;
  position: relative;
`
const RelativeDiv = styled.div`
  position: relative;
  width: 100%;
`
const SearchResultWrapper = styled.div`
  position: absolute;
  //   top: 90%;
  z-index: 10;
  margin-top: -10px;
  margin-left: -3%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  background-color: #f8f8f8;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 106%;
  min-height: 30px;
  max-height: 150px;
  overflow-y: auto;
`

const NotFoundWrapper = styled.div`
  padding: 6px 23px;
  margin: 0;
  display: flex;
  align-items: center;
`

export default {
  Wrapper,
  UpperWrapper,
  LowerInputWrapper,
  ButtonWrapper,
  InputWrapper,
  RelativeDiv,
  SearchResultWrapper,
  NotFoundWrapper,
}
