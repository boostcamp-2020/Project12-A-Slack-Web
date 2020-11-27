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
        hoverColor: 'blue',
      }}
    >
      텍스트
    </Text>
  )
}
