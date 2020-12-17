import React from 'react'
import Image from '.'

export default {
  title: 'Atoms/Image',
  component: Image,
}

export const image = () => {
  return <Image />
}

image.story = {
  name: 'Default',
}
