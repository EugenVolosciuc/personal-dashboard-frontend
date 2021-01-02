import { useContext } from 'react'

import widgetResizeModeContext from 'utils/contexts/widgetResizeModeContext'

const useWidgetResizeMode = () => {
  return useContext(widgetResizeModeContext)
}

export default useWidgetResizeMode