import React, { useState } from 'react'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetSettings from 'components/widgets/WidgetSettings/WidgetSettings'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'

const WidgetPositioner = ({ children, position, widget }) => {
  const [widgetIsMoving, setWidgetIsMoving] = useState(false)
  const { dashboardEditMode } = useDashboardEditMode()

  const positionStyle = {
    left: Math.round(position.x),
    top: Math.round(position.y),
    width: Math.round(position.widgetWidth),
    height: Math.round(position.widgetHeight)
  }

  return (
    <div style={positionStyle} className={`${styles['widget-positioner']} ${widgetIsMoving ? styles['is-moving'] : ''} ${dashboardEditMode ? styles['in-edit-mode'] : ''}`}>
      <WidgetSettings widget={widget} setWidgetIsMoving={setWidgetIsMoving} />
      {children}
    </div>
  )
}

export default WidgetPositioner