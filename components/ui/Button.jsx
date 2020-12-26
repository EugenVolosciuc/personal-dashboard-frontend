import React from 'react'

import styles from './styles/Button.module.scss'

const types = ['primary', 'secondary']

const Button = ({ 
  children, 
  className = '', 
  type = 'secondary', 
  htmlType = 'button', 
  onClick = () => null, 
  disabled = false, 
  fullWidth = false,
  size = 'md',
  buttonRef = null,
  danger = false
}) => {
  if (!types.includes(type)) throw new Error('Invalid type for button')

  const finalClassName = `${className} ${styles.button} ${styles[type]} ${size === 'sm' ? styles.sm : styles.md} ${fullWidth ? styles['full-width'] : ''} ${disabled ? styles.disabled : ''} ${danger ? styles.danger : ''}`

  return (
    <button
      ref={buttonRef}
      type={htmlType}
      onClick={onClick}
      className={finalClassName}>
      {children}
    </button>
  )
}

export default Button
