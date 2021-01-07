import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

import styles from 'components/misc/styles/AlertTemplate.module.scss'

const AlertTemplate = ({ style, options, message, close }) => {
  return (
    <div style={style} className={styles.alert}>
      <FontAwesomeIcon icon={faTimes} className={styles.close} onClick={close} />
      {options.type === 'info' && <FontAwesomeIcon icon={faExclamation} size="lg" className="text-yellow-400" />}
      {options.type === 'success' && <FontAwesomeIcon icon={faCheck} size="lg" className="text-green-400" />}
      {options.type === 'error' && <FontAwesomeIcon icon={faTimes} size="lg" className="text-red-400" />}
      <p className="ml-2 inline-block">{message}</p>
    </div>
  )
}

export default AlertTemplate
