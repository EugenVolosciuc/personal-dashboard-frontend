import { useState, createContext } from 'react'

const dashboardEditModeContext = createContext({
  editMode: false,
  setEditMode: () => null
})

export const DashboardEditModeProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <dashboardEditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </dashboardEditModeContext.Provider>
  )
}

export default dashboardEditModeContext