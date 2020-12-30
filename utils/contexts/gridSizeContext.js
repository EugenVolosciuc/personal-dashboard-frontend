import { useState, useEffect, createContext } from 'react'
import debounce from 'lodash/debounce'
import axios from 'axios'

let cancelToken

const gridSizeContext = createContext({
  gridSize: { width: 10, height: 6 },
  setGridSize: () => null
})

const MIN_DOT_DISTANCE_WIDTH = 140
const MIN_DOT_DISTANCE_HEIGHT = 140

export const GridSizeProvider = ({ children }) => {
  const [gridSize, setGridSize] = useState({ width: 10, height: 6 })

  const fetchGridSizeData = async (width, height) => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel()
    }

    cancelToken = axios.CancelToken.source()

    try {
      const { data } = await axios.get(`/grid-sizes?width=${width}&height=${height}`, { cancelToken: cancelToken.token })

      return { width, height, id: data._id }
    } catch (error) {
      if (axios.isCancel(error)) return
      console.log("ERROR FETCHING GRID SIZE", error)
    }

    return { width, height, id: null }
  }

  const handleResize = debounce(async () => {
    const gridElement = document.querySelector('#grid')
    const { offsetWidth, offsetHeight } = gridElement

    const width = Math.floor(offsetWidth / MIN_DOT_DISTANCE_WIDTH)
    const height = Math.floor(offsetHeight / MIN_DOT_DISTANCE_HEIGHT)

    const gridSizeData = await fetchGridSizeData(width, height)

    setGridSize(gridSizeData)
  }, 400)

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <gridSizeContext.Provider value={{ gridSize, setGridSize }}>
      {children}
    </gridSizeContext.Provider>
  )
}

export default gridSizeContext