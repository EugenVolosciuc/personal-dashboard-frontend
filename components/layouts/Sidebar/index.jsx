import React, { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/Sidebar.module.scss'
// import SidebarToggle from 'components/layouts/Sidebar/SidebarToggle'
import { MenuItem, NestedMenuItem } from 'components/ui'
import WIDGET_LIST from 'constants/WIDGET_LIST'
import useSidebar from 'utils/hooks/useSidebar'
import ApplicationHelpModal from 'components/modals/ApplicationHelpModal'

const Sidebar = () => {
  const [showHelpModal, setShowHelpModal] = useState(false)
  const { sidebarIsOpen } = useSidebar()

  const toggleHelpModal = () => setShowHelpModal(!showHelpModal)

  const mainMenuItems = useMemo(() => ([
    {
      label: 'Widgets',
      subItems: Object.values(WIDGET_LIST)
    }
  ]), [])

  const secondaryMenuItems = [
    {
      label: (
        <span className="flex items-center">
          <FontAwesomeIcon icon={faQuestionCircle} size="lg" className="text-accent" />
          <span className="ml-2">Help</span>
        </span>
      ),
      onClick: toggleHelpModal
    }
  ]

  return (
    <div className={`${styles.sidebar} ${sidebarIsOpen ? styles.open : ''}`}>
      {/* Removed SidebarToggle to avoid issues with widget positioning on resize */}
      {/* <SidebarToggle /> */}
      <div className="w-full h-full z-30 bg-primary relative flex flex-col">
        <div className={styles['logo-container']}>
          <p className={styles.logo}>Dashboard</p>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div>
            {mainMenuItems.map((item, index) => {
              const hasSubItems = item.subItems

              if (hasSubItems) return <NestedMenuItem key={item.label} menuData={item} menuType="side" className="font-bold" />

              return <MenuItem key={item.label || `top-menu-item-${index}`} menuData={item} menuType="side" className="font-bold" />
            })}
          </div>
          <div className="mb-2">
            <ApplicationHelpModal isOpen={showHelpModal} handleClose={toggleHelpModal} />
            {secondaryMenuItems.map((item, index) => (
              <MenuItem key={`secondary-menu-item-${index}`} menuData={item} menuType="side" className="font-bold" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
