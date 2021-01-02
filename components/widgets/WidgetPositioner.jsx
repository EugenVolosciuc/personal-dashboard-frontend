import React, { useState } from 'react'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetResizer from 'components/widgets/WidgetResizer'
import WidgetSettings from 'components/widgets/WidgetSettings/WidgetSettings'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'
import useWidgetResizeMode from 'utils/hooks/useWidgetResizeMode'

const WidgetPositioner = ({ children, position, widget }) => {
  const [widgetIsMoving, setWidgetIsMoving] = useState(false)
  const { dashboardEditMode } = useDashboardEditMode()
  const { resizedWidget } = useWidgetResizeMode()

  const positionStyle = {
    left: Math.round(position.x),
    top: Math.round(position.y),
    width: Math.round(position.widgetWidth),
    height: Math.round(position.widgetHeight)
  }

  return (
    <div 
      style={positionStyle} 
      className={`${styles['widget-positioner']}`}
    >
      <WidgetSettings widget={widget} setWidgetIsMoving={setWidgetIsMoving} />
      <WidgetResizer widget={widget} />
      <div className={`w-full h-full ${widgetIsMoving || resizedWidget === widget._id ? styles['is-moving'] : ''} ${dashboardEditMode ? styles['in-edit-mode'] : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default WidgetPositioner