import { createContext } from 'react'
import useSWR from 'swr'

import useGridSize from 'utils/hooks/useGridSize'
import { fetcher } from 'config/axios'
import useErrorHandler from 'utils/hooks/useErrorHandler'

const widgetPositionsContext = createContext()

export const WidgetPositionsProvider = ({ children }) => {
  const errorHandler = useErrorHandler()
  const { gridSize } = useGridSize()
  const { data: widgetPositions, mutate, isValidating, error } = useSWR(
    gridSize?.id ? `/widget-positions?gridSize=${gridSize.id}` : null, 
    url => fetcher(url, {}, errorHandler)
  )

  return (
    <widgetPositionsContext.Provider value={{ widgetPositions, mutate, isValidating, error }}>
      {children}
    </widgetPositionsContext.Provider>
  )
}

export default widgetPositionsContext