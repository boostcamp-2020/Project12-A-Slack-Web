import React from 'react'
import Styled from './MessageEditor.style'

interface MessageEditorProps {
  id?: number
  value?: string
  placeHolder?: string
}

function MessageEditor({ id, value, placeHolder }: MessageEditorProps) {
  const handleEditorClick = () => {
    console.log('CREATE MESSAGE !')
  }

  const createLastButton = () => {
    const button = document.createElement('button')
    button.addEventListener('click', () => handleEditorClick())

    return button
  }

  return (
    <Styled.Container>
    </Styled.Container>
  )
}

MessageEditor.defaultProps = {
  id: 0,
  value: '',
  placeHolder: 'Jot something down',
}

export default MessageEditor
