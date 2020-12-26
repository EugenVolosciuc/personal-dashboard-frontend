import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import styles from './styles/DashboardLayout.module.scss'
import DashboardNavbar from 'components/layouts/navbars/DashboardNavbar'
import Sidebar from 'components/layouts/Sidebar/Sidebar'
import { DashboardEditModeProvider } from 'utils/contexts/dashboardEditModeContext'
import { GridSizeProvider } from 'utils/contexts/gridSizeContext'
import { WidgetPositionsProvider } from 'utils/contexts/widgetPositionsContext'
import useSidebar from 'utils/hooks/useSidebar'

const DashboardLayout = ({ children }) => {
  const { sidebarIsOpen } = useSidebar()

  return (
    <div className="w-full flex justify-end relative">
      <DndProvider backend={HTML5Backend}>
        <DashboardEditModeProvider>
          <GridSizeProvider>
            <WidgetPositionsProvider>
              <Sidebar />
              <div className={`${styles['content-container']} ${sidebarIsOpen ? styles['sidebar-open'] : ''}`}>
                <DashboardNavbar />
                <div className={styles.content}>
                  {children}
                </div>
              </div>
            </WidgetPositionsProvider>
          </GridSizeProvider>
        </DashboardEditModeProvider>
      </DndProvider>
    </div>
  )
}

export default DashboardLayout
