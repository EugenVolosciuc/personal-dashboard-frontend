import React from 'react'

import styles from 'components/ui/styles/Tabs.module.scss'

const TabItem = ({ title, active, handleClick }) => {
  return <p onClick={handleClick} className={`${styles['tab-item']} ${active ? styles.active : ''}`}>{title}</p>
}

export default TabItem
