import React from 'react'

import styles from '../styles/SidebarToggle.module.scss'
import useSidebar from 'utils/hooks/useSidebar'

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <div className={styles['toggle-container']}>
      <span className={styles.toggle} onClick={toggleSidebar}></span>
    </div>
  )
}

export default SidebarToggle
