import React from 'react'

const WidgetPositioner = ({ children, position }) => {
  const positionStyle = {
    left: Math.round(position.x),
    top: Math.round(position.y),
    width: Math.round(position.widgetWidth),
    height: Math.round(position.widgetHeight)
  }

  return (
    <div className="fixed" style={positionStyle}>
      {children}
    </div>
  )
}

export default WidgetPositioner