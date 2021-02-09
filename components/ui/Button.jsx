import React from 'react'

import styles from './styles/Button.module.scss'
import { Loader } from 'components/ui'

const types = ['primary', 'secondary']

const Button = ({
  children,
  loading = false,
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

  const finalClassName = `${className} ${styles.button} ${styles[type]} ${styles[size]} ${fullWidth ? styles['full-width'] : ''} ${disabled ? styles.disabled : ''} ${danger ? styles.danger : ''}`

  const handleClick = event => {
    event.stopPropagation()
    onClick(event)
  }

  return (
    <button
      ref={buttonRef}
      type={htmlType}
      onClick={handleClick}
      className={finalClassName}>
      {children}
      {loading && <span className="ml-2"><Loader color={type === "secondary" ? "accent" : "white"} /></span>}
    </button>
  )
}

export default Button
