import React from 'react'

import DashboardLayout from 'components/layouts/DashboardLayout'
import { useAuth } from 'utils/contexts/auth'
import WidgetDropZone from 'components/widgets/WidgetDropZone'
import { Loader } from 'components/ui'

const Dashboard = () => {
  const { user } = useAuth(true)

  return (
    <>
      {!user
        ? <div className="w-screen h-screen flex flex-col justify-center items-center">
          <p className="font-bold text-lg mb-4">Loading...</p>
          <Loader size="3x" />
        </div>
        : <DashboardLayout>
          <WidgetDropZone />
        </DashboardLayout>
      }
    </>
  )
}

export default Dashboard
