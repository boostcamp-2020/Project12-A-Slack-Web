import React from 'react'

const calcModalPosition = (
  modalWidth: number,
  modalHeight: number,
  event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  window: Window & typeof globalThis,
) => {
  const { clientX: cX, clientY: cY } = event
  const { innerWidth: wWidth, innerHeight: wHeight } = window
  const left = cX + modalWidth < wWidth ? cX : wWidth - modalWidth + 20
  const top = cY + modalHeight < wHeight ? cY : wHeight - modalHeight + 20
  return [left, top]
}

export default calcModalPosition
