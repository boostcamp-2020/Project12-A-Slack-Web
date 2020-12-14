import React, { useState } from 'react'
import Input from '.'

export default {
  title: 'Atoms/Input',
  component: Input,
}

export const input = () => {
  const [value, setValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }
  return <Input value={value} onChange={handleInputChange} />
}

input.story = {
  name: 'Default',
}
