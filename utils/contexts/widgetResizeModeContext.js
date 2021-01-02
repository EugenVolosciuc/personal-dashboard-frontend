import { useState, createContext } from 'react'

const widgetResizeModeContext = createContext({
  resizedWidget: null,
  isResizing: false,
  toggleResizeWidgetMode: () => null
})

export const WidgetResizeModeProvider = ({ children }) => {
  const [resizedWidget, setResizedWidget] = useState(null) // ID of resized widget

  const toggleResizeWidgetMode = id => {
    if (!id || id === resizedWidget) return setResizedWidget(null)

    setResizedWidget(id)
  }

  return (
    <widgetResizeModeContext.Provider value={{ resizedWidget, isResizing: !!resizedWidget, toggleResizeWidgetMode }}>
      {children}
    </widgetResizeModeContext.Provider>
  )
}

export default widgetResizeModeContext