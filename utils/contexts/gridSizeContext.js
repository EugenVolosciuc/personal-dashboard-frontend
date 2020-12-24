import { useState, useEffect, createContext } from 'react'
import debounce from 'lodash/debounce'

const gridSizeContext = createContext({
  gridSize: { length: 10, height: 6 },
  setGridSize: () => null
})

const MIN_DOT_DISTANCE_WIDTH = 130
const MIN_DOT_DISTANCE_HEIGHT = 140

export const GridSizeProvider = ({ children }) => {
  const [gridSize, setGridSize] = useState({ length: 10, height: 6 })

  const handleResize = debounce(event => {
    const gridElement = document.querySelector('#grid')
    const { offsetWidth, offsetHeight } = gridElement

    setGridSize({ 
      length: Math.floor(offsetWidth / MIN_DOT_DISTANCE_WIDTH),
      height: Math.floor(offsetHeight / MIN_DOT_DISTANCE_HEIGHT)
    })
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