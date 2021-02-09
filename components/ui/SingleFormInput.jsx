import React, { useState } from 'react'

import { ClearInput, Button } from 'components/ui'

const SingleFormInput = ({ handleClick = null, placeholder = "", btnHtmlType = "button", btnContent }) => {
  const [value, setValue] = useState('')

  return (
    <div className="flex overflow-hidden">
      <ClearInput placeholder={placeholder} value={value} handleChange={setValue} size="sm" className="w-3/5 mr-2" />
      <Button 
        type="primary" 
        htmlType={btnHtmlType} 
        size="sm" 
        onClick={handleClick ? () => handleClick(value) : () => null} 
        className="w-2/5">
        {btnContent}
      </Button>
    </div>
  )
}

export default SingleFormInput
