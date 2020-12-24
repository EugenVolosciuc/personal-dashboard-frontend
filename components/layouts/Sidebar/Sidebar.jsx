import React, { useState, useEffect, useMemo } from 'react'

import styles from '../styles/Sidebar.module.scss'
import SidebarToggle from 'components/layouts/Sidebar/SidebarToggle'
import { MenuItem } from 'components/ui'
// import { useAuth } from 'utils/contexts/auth'

const Sidebar = ({ isOpen, setIsOpen }) => {
  // const { user } = useAuth()

  const menuItems = useMemo(() => ([
    {
      label: 'Widgets',
      // href: '/auth/sign-up'
    }
  ]), [])

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-full z-30 bg-white relative">
        <div className={styles['logo-container']}>
          <p className={styles.logo}>Dashboard</p>
        </div>

        <div className={styles['menu-container']}>
          {menuItems.map((item, index) => <MenuItem key={item.label || `top-menu-item-${index}`} menuData={item} menuType="side" className="font-bold" />)}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
