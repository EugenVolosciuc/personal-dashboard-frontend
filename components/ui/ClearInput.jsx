import React from 'react'

import styles from './styles/ClearInput.module.scss'

const ClearInput = ({ value, handleChange, placeholder, size = 'lg', className = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={event => handleChange(event.target.value)}
      placeholder={placeholder}
      className={`${styles['clear-input']} ${size === 'sm' ? styles.sm : styles.lg} ${className}`}
    />
  )
}

export default ClearInput
