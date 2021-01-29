import React from 'react'

import DashboardLayout from 'components/layouts/DashboardLayout'
import { useAuth } from 'utils/contexts/auth'
import WidgetDropZone from 'components/widgets/WidgetDropZone'
import { Loader } from 'components/ui'

const Dashboard = () => {
  const { user, userIsLoading } = useAuth(true)

  return (
    <DashboardLayout>
      {userIsLoading && !user && <Loader />}
      <WidgetDropZone />
    </DashboardLayout>
  )
}

export default Dashboard
