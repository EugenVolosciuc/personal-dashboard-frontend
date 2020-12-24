import React, { useMemo } from 'react'

import styles from '../styles/MainNavbar.module.scss'
import { MenuItem } from 'components/ui'

const MainNavbar = () => {
  const menuItems = useMemo(() => ([
    {
      label: 'Login',
      href: '/auth/login'
    },
    {
      label: 'Sign up',
      href: '/auth/sign-up'
    }
  ]), [])

  return (
    <nav className={styles.navbar}>
      <div className={styles['logo-container']}>
        <p className={styles.logo}>Dashboard</p>
      </div>
      <div className={styles['menu-container']}>
        {menuItems.map(item => <MenuItem key={item.label} menuData={item} menuType="top" />)}
      </div>
    </nav>
  )
}

export default MainNavbar
