import { createContext } from 'react'
import useSWR from 'swr'

import useGridSize from 'utils/hooks/useGridSize'
import { fetcher } from 'config/axios'
import useErrorHandler from 'utils/hooks/useErrorHandler'
import { useAuth } from 'utils/contexts/auth'

const widgetPositionsContext = createContext()

export const WidgetPositionsProvider = ({ children }) => {
  const { user } = useAuth()
  const errorHandler = useErrorHandler()
  const { gridSize } = useGridSize()
  const { data: widgetPositions, mutate, isValidating, error } = useSWR(
    gridSize?.id ? [`/widget-positions?gridSize=${gridSize.id}`, user._id] : null, 
    url => fetcher(url, {}, errorHandler)
  )

  return (
    <widgetPositionsContext.Provider value={{ widgetPositions, mutate, isValidating, error }}>
      {children}
    </widgetPositionsContext.Provider>
  )
}

export default widgetPositionsContext