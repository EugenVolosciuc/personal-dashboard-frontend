import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import styles from './styles/DashboardLayout.module.scss'
import DashboardNavbar from 'components/layouts/navbars/DashboardNavbar'
import Sidebar from 'components/layouts/Sidebar/Sidebar'
import { DashboardEditModeProvider } from 'utils/contexts/dashboardEditModeContext'
import { GridSizeProvider } from 'utils/contexts/gridSizeContext'

const DashboardLayout = ({ children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  return (
    <div className="w-full flex justify-end relative">
      <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
      <div className={`${styles['content-container']} ${sidebarIsOpen ? styles['sidebar-open'] : ''}`}>
        <DashboardNavbar />
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <DashboardEditModeProvider>
              <GridSizeProvider>
                {children}
              </GridSizeProvider>
            </DashboardEditModeProvider>
          </DndProvider>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
