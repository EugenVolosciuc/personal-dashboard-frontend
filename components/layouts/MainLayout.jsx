import React from 'react'

import styles from './styles/MainLayout.module.scss'
import MainNavbar from 'components/layouts/navbars/MainNavbar'

const MainLayout = ({children}) => {
  return (
    <div className="w-full bg-primary">
      <MainNavbar />
      <div className={styles['content-container']}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
