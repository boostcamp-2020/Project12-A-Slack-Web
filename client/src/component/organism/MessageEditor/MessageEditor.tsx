import React from 'react'
import styled from 'styled-components'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import A from '@atom'

// later: userId from store
interface MessageEditorProps {
  id: number
}

function MessageEditor({ id }: MessageEditorProps) {
  return (
    <>
      <Editor
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        placeholder="글쓰기"
      />
    </>
  )
}

export default MessageEditor
