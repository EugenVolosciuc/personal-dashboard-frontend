import { useContext } from 'react'

import sidebarContext from 'utils/contexts/sidebarContext'

const useSidebar = () => {
  return useContext(sidebarContext)
}

export default useSidebar