import { useState, useEffect, createContext } from 'react'
import isNil from 'lodash/isNil'

const sidebarContext = createContext({ sidebarIsOpen: true, toggleSidebar: () => null })

export const SidebarProvider = ({ children}) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen)
    window.localStorage.setItem('pd-sidebar', !sidebarIsOpen)
  }

  useEffect(() => {
    const sidebarInLocalStorage = window.localStorage.getItem('pd-sidebar')
    
    if (!isNil(sidebarInLocalStorage)) setSidebarIsOpen(sidebarInLocalStorage)
  }, [])

  return (
    <sidebarContext.Provider value={{ sidebarIsOpen, toggleSidebar }}>
      {children}
    </sidebarContext.Provider>
  )
}

export default sidebarContext