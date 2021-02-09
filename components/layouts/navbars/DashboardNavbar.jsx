import React, { useMemo } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { cache } from 'swr'

import styles from '../styles/DashboardNavbar.module.scss'
import { useAuth } from 'utils/contexts/auth'
import { MenuItem } from 'components/ui'
import useTheme from 'utils/hooks/useTheme'

const DashboardNavbar = () => {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.post('/users/logout')
      cache.delete()
      router.push('/auth/login')
    } catch (error) {
      console.log("ERROR LOGGING OUT", error)
    }
  }

  const menuItems = useMemo(() => ([
    {
      label: 'Logout',
      onClick: handleLogout
    },
    // {
    //   label: 'Toggle Theme',
    //   onClick: () => {
    //     const isDark = theme === 'dark'

    //     setTheme(isDark ? 'light' : 'dark')
    //   }
    // },
    {
      label: user?.username,
      onClick: () => null
      // href: '/auth/sign-up'
    }
  ]), [user, theme])

  return (
    <nav className={styles.navbar}>
      <div className={styles['menu-container']}>
        {menuItems.map((item, index) => <MenuItem key={item.label || `top-menu-item-${index}`} menuData={item} menuType="top" />)}
      </div>
    </nav>
  )
}

export default DashboardNavbar
