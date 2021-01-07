import { useContext } from 'react'

import themeContext from 'utils/contexts/themeContext'

const useTheme = () => {
  return useContext(themeContext)
}

export default useTheme