import React from 'react'

import DashboardLayout from 'components/layouts/DashboardLayout'
import { NotesCard } from 'components/widgets/cards'
import { useAuth } from 'utils/contexts/auth'
import Grid from 'components/gridSystem/Grid'
import WidgetDropZone from 'components/widgets/WidgetDropZone'

const Dashboard = () => {
  const { user } = useAuth(true)
  
  return (
    <DashboardLayout>
      {/* <NotesCard /> */}
      <Grid />
      {/* <WidgetDropZone /> */}
    </DashboardLayout>
  )
}

export default Dashboard
