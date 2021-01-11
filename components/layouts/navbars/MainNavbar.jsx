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
      label: 'Register',
      href: '/auth/register'
    }
  ]), [])

  return (
    <nav className={styles.navbar}>
      <div className={styles['logo-container']}>
        <p className={styles.logo}><img src="/assets/logo.svg" alt="Logo" /> <span className="ml-2">planster</span></p>
      </div>
      <div className={styles['menu-container']}>
        {menuItems.map(item => <MenuItem key={item.label} menuData={item} menuType="top" />)}
      </div>
    </nav>
  )
}

export default MainNavbar
