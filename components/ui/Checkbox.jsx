import React from 'react'

const Checkbox = ({ value, checked, name, handleChange, label = "" }) => {
  return (
    <div>
      <input type="checkbox" name={name} checked={checked} value={value} onChange={handleChange} />
    </div>
  )
}

export default Checkbox
