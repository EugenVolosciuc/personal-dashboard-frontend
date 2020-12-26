import React from 'react'

import styles from './styles/Card.module.scss'

const Card = ({ children, title, extra, style = {} }) => {
  return (
    <div className={styles.card} style={style}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {extra && <span className={styles.extra}>{extra}</span>}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Card
