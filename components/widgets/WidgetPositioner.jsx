import React from 'react'

const WidgetPositioner = ({ children, position }) => {

  const positionStyle = {
    left: Math.round(position.coordinates.x),
    top: Math.round(position.coordinates.y),
    width: Math.round(position.measurements.width),
    height: Math.round(position.measurements.height)
  }

  return (
    <div className="absolute" style={positionStyle}>
      {children}
    </div>
  )
}

export default WidgetPositioner