import React, { createRef, useEffect } from 'react'
import '../../../../node_modules/@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import Styled from './MessageEditor.style'

interface MessageEditorProps {
  id?: number
  value?: string
  placeHolder?: string
}

function MessageEditor({ id, value, placeHolder }: MessageEditorProps) {
  const editorRef = createRef<Editor>()

  const handleEditorClick = () => {
    const editor = editorRef.current?.getInstance()
    console.log('CREATE MESSAGE !')
    console.log(editor?.getHtml())
  }

  const createLastButton = () => {
    const button = document.createElement('button')
    button.addEventListener('click', () => handleEditorClick())

    return button
  }

  useEffect(() => {
    const editor = editorRef.current?.getInstance()
    if (value) editor?.setHtml(value, true)
  }, [])

  return (
    <Styled.Container>
      <Editor
        previewStyle="vertical"
        height="100px"
        initialEditType="wysiwyg"
        placeholder={placeHolder}
        ref={editorRef}
        hideModeSwitch
        toolbarItems={[
          'bold',
          'italic',
          'strike',
          'code',
          'link',
          'ul',
          'ol',
          'quote',
          'codeblock',
          'image',
          'divider',
          {
            type: 'button',
            options: {
              el: createLastButton(),
              className: 'last',
              event: 'click',
              tooltip: 'Create message',
              text: '>',
              style: 'color:black;position:absolute;right:0;margin-right:15px',
            },
          },
        ]}
      />
    </Styled.Container>
  )
}

MessageEditor.defaultProps = {
  id: 0,
  value: '',
  placeHolder: 'Jot something down',
}

export default MessageEditor
