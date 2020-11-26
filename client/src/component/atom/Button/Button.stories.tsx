import React from 'react'
// import { text, boolean } from '@storybook/addon-knobs'

import Button from '.'

export default {
  title: 'Atoms/Button',
  component: Button,
}

export const button = () => {
  return <Button />
}

button.story = {
  name: 'Default',
}

export const styledButton = () => {
  // const height = text('height', '16px')
  // const width = text('text', '16px')
  // const margin = text('text', '16px')
  // const padding = text('text', '16px')
  // const radius = text('text', '50%')
  // const border = text('text', '1px solid green')
  // const backgroundColor = text('text', 'white')
  // const hover = boolean('disable', true)
  return (
    <Button
      customStyle={{
        height: '16px',
        width: '16px',
        margin: '10px',
        padding: '10px',
        borderRadius: '50%',
        border: '1px solid green',
        backgroundColor: 'white',
        hoverBackgroundColor: 'grey',
      }}
    />
  )
}

export const disabledButton = () => {
  return <Button customStyle={{ disabled: true }} />
}
