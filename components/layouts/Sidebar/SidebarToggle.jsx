import React from 'react'

import styles from '../styles/SidebarToggle.module.scss'

const SidebarToggle = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => setIsOpen(!isOpen)
  
  return (
    <div className={styles['toggle-container']}>
      <span className={styles.toggle} onClick={toggleSidebar}></span>
    </div>
  )
}

export default SidebarToggle
