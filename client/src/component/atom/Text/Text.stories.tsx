import React from 'react'

import Text from '.'

export default {
  title: 'Atoms/Text',
  component: Text,
}

export const text = () => {
  return <Text>text</Text>
}

text.story = {
  name: 'Default',
}

export const styledText = () => {
  return (
    <Text
      customStyle={{
        color: 'red',
      }}
    >
      텍스트
    </Text>
  )
}
