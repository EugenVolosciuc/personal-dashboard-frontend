import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import styles from './styles/DashboardLayout.module.scss'
import DashboardNavbar from 'components/layouts/navbars/DashboardNavbar'
import Sidebar from 'components/layouts/Sidebar'
import { DashboardEditModeProvider } from 'utils/contexts/dashboardEditModeContext'
import { GridSizeProvider } from 'utils/contexts/gridSizeContext'
import { WidgetPositionsProvider } from 'utils/contexts/widgetPositionsContext'
import { WidgetResizeModeProvider } from 'utils/contexts/widgetResizeModeContext'
import { ThemeProvider } from 'utils/contexts/themeContext'
import useSidebar from 'utils/hooks/useSidebar'

const DashboardLayout = ({ children }) => {
  const { sidebarIsOpen } = useSidebar()

  return (
    <div className="w-full flex justify-end relative">
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <DashboardEditModeProvider>
            <GridSizeProvider>
              <WidgetPositionsProvider>
                <WidgetResizeModeProvider>
                  <Sidebar />
                  <div className={`${styles['content-container']} ${sidebarIsOpen ? styles['sidebar-open'] : ''}`}>
                    <DashboardNavbar />
                    <div className={styles.content}>
                      {children}
                    </div>
                  </div>
                </WidgetResizeModeProvider>
              </WidgetPositionsProvider>
            </GridSizeProvider>
          </DashboardEditModeProvider>
        </DndProvider>
      </ThemeProvider>
    </div>
  )
}

export default DashboardLayout
