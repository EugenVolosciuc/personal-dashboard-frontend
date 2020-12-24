import { useState, useEffect, createContext } from 'react'

import { useAuth } from 'utils/contexts/auth'

const widgetPositionsContext = createContext()

export const WidgetPositionsProvider = ({children}) => {
  const { user } = useAuth()

  
}

export default widgetPositionsContext