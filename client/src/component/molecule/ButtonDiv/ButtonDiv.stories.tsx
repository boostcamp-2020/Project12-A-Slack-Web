import React from 'react'
import ButtonDiv from '.'

export default {
  title: 'Molecule/ButtonDiv',
  component: ButtonDiv,
}

export const buttonDiv = () => {
  return <ButtonDiv>ButtonDiv</ButtonDiv>
}

buttonDiv.story = {
  name: 'Default',
}

export const styledButtonDiv = () => {
  return (
    <ButtonDiv
      buttonStyle={{ backgroundColor: 'blue' }}
      textStyle={{ color: 'red' }}
      onClick={() => alert('ButtonDiv click')}
    >
      <div>Styled ButtonDiv</div>
    </ButtonDiv>
  )
}
