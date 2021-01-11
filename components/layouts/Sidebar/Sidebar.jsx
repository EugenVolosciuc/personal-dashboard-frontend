import React, { useMemo } from 'react'

import styles from '../styles/Sidebar.module.scss'
import SidebarToggle from 'components/layouts/sidebar/SidebarToggle'
import { MenuItem, NestedMenuItem } from 'components/ui'
import WIDGET_LIST from 'constants/WIDGET_LIST'
import useSidebar from 'utils/hooks/useSidebar'

const Sidebar = () => {
  const { sidebarIsOpen } = useSidebar()
  const menuItems = useMemo(() => ([
    {
      label: 'Widgets',
      subItems: Object.values(WIDGET_LIST)
      // href: '/auth/register'
    }
  ]), [])

  return (
    <div className={`${styles.sidebar} ${sidebarIsOpen ? styles.open : ''}`}>
      {/* Removed SidebarToggle to avoid issues with widget positioning on resize */}
      {/* <SidebarToggle /> */}
      <div className="w-full h-full z-30 bg-primary relative">
        <div className={styles['logo-container']}>
          <p className={styles.logo}>Dashboard</p>
        </div>

        <div className={styles['menu-container']}>
          {menuItems.map((item, index) => {
            const hasSubItems = item.subItems

            if (hasSubItems) return <NestedMenuItem key={item.label} menuData={item} menuType="side" className="font-bold" />

            return <MenuItem key={item.label || `top-menu-item-${index}`} menuData={item} menuType="side" className="font-bold" />
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
