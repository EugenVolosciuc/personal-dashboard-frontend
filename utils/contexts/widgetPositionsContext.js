import { createContext } from 'react'
import useSWR from 'swr'

import useGridSize from 'utils/hooks/useGridSize'
import { fetcher } from 'config/axios'

const widgetPositionsContext = createContext()

export const WidgetPositionsProvider = ({ children }) => {
  const { gridSize } = useGridSize()
  const { data: widgetPositions, mutate, isValidating, error } = useSWR(gridSize?.id ? `/widget-positions?gridSize=${gridSize.id}` : null, fetcher)

  return (
    <widgetPositionsContext.Provider value={{ widgetPositions, mutate, isValidating, error }}>
      {children}
    </widgetPositionsContext.Provider>
  )
}

export default widgetPositionsContext