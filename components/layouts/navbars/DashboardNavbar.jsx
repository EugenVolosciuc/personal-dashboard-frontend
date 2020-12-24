import React, { useMemo } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import styles from '../styles/DashboardNavbar.module.scss'
import { useAuth } from 'utils/contexts/auth'
import { MenuItem } from 'components/ui'

const DashboardNavbar = () => {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.post('/users/logout')
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
    {
      label: user?.username,
      onClick: () => null
      // href: '/auth/sign-up'
    }
  ]), [user])

  return (
    <nav className={styles.navbar}>
      <div className={styles['menu-container']}>
        {menuItems.map((item, index) => <MenuItem key={item.label || `top-menu-item-${index}`} menuData={item} menuType="top" />)}
      </div>
    </nav>
  )
}

export default DashboardNavbar
