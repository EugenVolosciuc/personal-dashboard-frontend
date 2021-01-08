import React from 'react'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetRemoveSetting from 'components/widgets/widget-settings/WidgetRemoveSetting'
import WidgetMoveSetting from 'components/widgets/widget-settings/WidgetMoveSetting'
// import WidgetResizeSetting from 'components/widgets/WidgetSettings/WidgetResizeSetting'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'

const WidgetSettings = ({ widget, setWidgetIsMoving }) => {
  const { dashboardEditMode } = useDashboardEditMode()
  
  return (
    <>
      <div className={styles['left-top']}>
        <WidgetMoveSetting widget={widget} setWidgetIsMoving={setWidgetIsMoving} />
      </div>
      <div className={`${styles['right-top']} ${dashboardEditMode ? 'hidden' : ''}`}>
        <WidgetRemoveSetting widget={widget} />
      </div>
    </>
  )
}

export default WidgetSettings
