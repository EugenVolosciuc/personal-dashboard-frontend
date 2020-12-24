import { useContext } from 'react'

import gridSizeContext from 'utils/contexts/gridSizeContext'

const useGridSize = () => {
  return useContext(gridSizeContext)
}

export default useGridSize