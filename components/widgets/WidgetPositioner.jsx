import React, { useState } from 'react'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetResizerContainer from 'components/widgets/WidgetResizerContainer'
import WidgetSettings from 'components/widgets/widget-settings/WidgetSettings'
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
      <WidgetResizerContainer widget={widget} />
      <div className={`w-full h-full ${widgetIsMoving || resizedWidget === widget._id ? styles['is-moving'] : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default WidgetPositioner