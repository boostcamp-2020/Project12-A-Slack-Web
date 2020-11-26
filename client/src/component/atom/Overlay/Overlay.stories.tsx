import React from 'react'
import Overlay from '.'

export default {
  title: 'Atoms/Overlay',
  component: Overlay,
}

export const overlay = () => {
  return <Overlay />
}

overlay.story = {
  name: 'Default',
}

export const styledOverlay = () => {
  return (
    <Overlay
      customStyle={{
        opacity: '0.5',
      }}
      onClick={() => alert('overlay click')}
    />
  )
}
