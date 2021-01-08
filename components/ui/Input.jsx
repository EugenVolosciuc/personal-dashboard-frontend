import React from 'react'

import styles from './styles/Input.module.scss'

// Props:
// type: 'text' | 'number' | 'email' | 'password'
const Input = ({
  name,
  formRef,
  type = 'text',
  label = '',
  placeholder = '',
  fullWidth = false,
  error = null,
  defaultValue = '',
  size = 'md'
}) => {
  return (
    <div className={`${styles['input-container']} ${fullWidth ? styles['full-width'] : ''} ${styles[size]}`}>
      <div className="flex flex-col">
        {label && <label className="font-bold">{label}</label>}
        <input
          className={styles.input}
          type={type}
          name={name}
          ref={formRef}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
      {error && <p className="text-rose-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default Input
