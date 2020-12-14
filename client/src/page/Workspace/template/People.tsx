import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store'
import styled from 'styled-components'
import A from '@atom'
import O from '@organism'
import { InputType } from '@atom/Input'
import { TextType } from '@atom/Text'
import workspaceAPI from '@api/workspace'

interface PeopleProps {
  workspaceId: number
  handleSubViewHeader: (node: React.ReactNode) => void
  handleSubViewBody: (node: React.ReactNode) => void
  handleSubViewOpen: () => void
}

const People = ({
  workspaceId,
  handleSubViewOpen,
  handleSubViewHeader,
  handleSubViewBody,
}: PeopleProps) => {
  const { id: loginUserId } = useSelector(
    (state: RootState) => state.userStore.currentUser,
  )

  const [teammates, setTeammates] = useState([])
  const [inputKeyword, setInputKeyword] = useState('')

  const searchTeammates = async (searchKeyword: string) => {
    const { success, data } = await workspaceAPI.getTeammates({
      workspaceId,
      searchKeyword,
    })
    if (success) setTeammates(data)
  }

  useEffect(() => {
    searchTeammates('')
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    setInputKeyword(inputValue)
  }
  const handleKeyPressOnInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === 'Enter') searchTeammates(inputKeyword)
  }

  const peopleMainViewHeader = <O.PeopleHeader workspaceId={workspaceId} />
  const peopleMainViewBody = (
    <Wrapper>
      <HeaderWrapper>
        <A.Input
          placeholder="Search by name or email"
          value={inputKeyword}
          onChange={handleInputChange}
          customStyle={inputStyle}
          onKeyPress={handleKeyPressOnInput}
        />

        <ResultListHeaderWrapper>
          <A.Text customStyle={resultHeaderTextStyle}>
            {teammates.length === 0
              ? 'No results'
              : teammates.length +
                (teammates.length > 1 ? ' members' : ' member')}
          </A.Text>
        </ResultListHeaderWrapper>
      </HeaderWrapper>

      <O.TeammateList
        teammateList={teammates}
        loginUserId={loginUserId}
        handleSubViewOpen={handleSubViewOpen}
        handleSubViewHeader={handleSubViewHeader}
        handleSubViewBody={handleSubViewBody}
      />
    </Wrapper>
  )

  return (
    <>
      <ViewHeader>{peopleMainViewHeader}</ViewHeader>
      <ViewBody>{peopleMainViewBody}</ViewBody>
    </>
  )
}

// TODO: 반복되는 ViewHeader 스타일 분리
const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 61px;
  flex: 0 0 61px;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(230, 230, 230);
  border-top: 1px solid rgb(230, 230, 230);
`
const ViewBody = styled.div`
  flex: 1 1 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  height: 100%;
`
const HeaderWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
`
const ResultListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 0;
  //   border-bottom: 1px solid rgb(230, 230, 230);
`

const inputStyle: InputType.StyleAttributes = {
  border: '1px solid grey',
  borderRadius: '5px',
  padding: '0 10px',
  margin: '20px 0',
  fontSize: '1.4rem',
  width: '100%',
}
const resultHeaderTextStyle: TextType.StyleAttributes = {
  color: 'darkGrey',
  fontSize: '1.4rem',
  fontWeight: '500',
}

export default People
