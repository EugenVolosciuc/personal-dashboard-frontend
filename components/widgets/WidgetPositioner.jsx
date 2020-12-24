import React from 'react'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetSettings from 'components/widgets/WidgetSettings'

const WidgetPositioner = ({ children, position, widget }) => {
  const positionStyle = {
    left: Math.round(position.x),
    top: Math.round(position.y),
    width: Math.round(position.widgetWidth),
    height: Math.round(position.widgetHeight)
  }

  return (
    <div style={positionStyle} className={styles['widget-positioner']}>
      <WidgetSettings widget={widget} />
      {children}
    </div>
  )
}

export default WidgetPositioner