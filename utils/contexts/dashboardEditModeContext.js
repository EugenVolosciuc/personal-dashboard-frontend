import { useState, createContext } from 'react'

const dashboardEditModeContext = createContext({
  dashboardEditMode: false,
  toggleDashboardEditMode: () => null
})

export const DashboardEditModeProvider = ({ children }) => {
  const [dashboardEditMode, setDashboardEditMode] = useState(false)

  const toggleDashboardEditMode = () => setDashboardEditMode(!dashboardEditMode)

  return (
    <dashboardEditModeContext.Provider value={{ dashboardEditMode, toggleDashboardEditMode }}>
      {children}
    </dashboardEditModeContext.Provider>
  )
}

export default dashboardEditModeContext