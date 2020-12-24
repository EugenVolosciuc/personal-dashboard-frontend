import React from 'react'

import DashboardLayout from 'components/layouts/DashboardLayout'
import { useAuth } from 'utils/contexts/auth'
import WidgetDropZone from 'components/widgets/WidgetDropZone'

const Dashboard = () => {
  const { user } = useAuth(true)
  
  return (
    <DashboardLayout>
      <WidgetDropZone />
    </DashboardLayout>
  )
}

export default Dashboard
