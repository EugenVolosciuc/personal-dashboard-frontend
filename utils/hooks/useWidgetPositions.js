import { useContext } from 'react'

import widgetPositionsContext from 'utils/contexts/widgetPositionsContext'

const useWidgetPositions = () => {
  return useContext(widgetPositionsContext)
}

export default useWidgetPositions