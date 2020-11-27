import React from 'react'
// import { text, boolean } from '@storybook/addon-knobs'
import myIcon from '@constant/icon'
import Icon from '.'

export default {
  title: 'Atoms/Icon',
  component: Icon,
}

export const icon = () => {
  return <Icon icon={myIcon.search} />
}

icon.story = {
  name: 'Default',
}
