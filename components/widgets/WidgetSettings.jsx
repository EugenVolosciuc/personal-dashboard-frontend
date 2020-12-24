import React from 'react'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'

const WidgetSettings = ({ widget }) => {
  return (
    <div className={styles['widget-settings']}>
      <div className={styles.ball}>M</div>
      <div className={styles.ball}>D</div>
      <div className={styles.ball}>R</div>
    </div>
  )
}

export default WidgetSettings
