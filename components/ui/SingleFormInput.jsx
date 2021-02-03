import React, { useState } from 'react'

import { ClearInput, Button } from 'components/ui'

const SingleFormInput = ({ handleClick, placeholder = "" }) => {
  const [value, setValue] = useState('')

  return (
    <div className="flex overflow-hidden">
      <ClearInput placeholder={placeholder} value={value} handleChange={setValue} size="sm" className="w-3/5 mr-2" />
      <Button type="primary" size="sm" onClick={() => handleClick(value)} className="w-2/5">Add</Button>
    </div>
  )
}

export default SingleFormInput
