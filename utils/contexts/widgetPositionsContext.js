import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import useSWR from 'swr'

import useGridSize from 'utils/hooks/useGridSize'
import { fetcher } from 'config/axios'

const widgetPositionsContext = createContext()

export const WidgetPositionsProvider = ({ children }) => {
  // const [widgetPositions, setWidgetPositions] = useState([])
  const { gridSize } = useGridSize()

  console.log("GRID SIZE ID", gridSize)

  // TODO: change this with useSWR
  const { data: widgetPositions, mutate, isValidating } = useSWR(gridSize.id ? `/widget-positions?gridSize=${gridSize.id}` : null, fetcher)

  console.log("WIDGET POSITIONS", widgetPositions)
  // useEffect(() => {
  //   (async () => {
  //     if (gridSize.id) {
  //       try {
  //         const { data } = await axios.get(`/widget-positions?gridSize=${gridSize.id}`)

  //         setWidgetPositions(data)
  //       } catch (error) {
  //         console.log("ERROR FETCHING WIDGET POSITIONS", error)
  //       }
  //     }
  //   })()
  // }, [gridSize])

  return (
    <widgetPositionsContext.Provider value={{ widgetPositions, mutate, isValidating }}>
      {children}
    </widgetPositionsContext.Provider>
  )
}

export default widgetPositionsContext