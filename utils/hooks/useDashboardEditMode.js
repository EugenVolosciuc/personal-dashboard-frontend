import { useContext } from 'react'

import dashboardEditModeContext from 'utils/contexts/dashboardEditModeContext'

const useDashboardEditMode = () => {
  return useContext(dashboardEditModeContext)
}

export default useDashboardEditMode