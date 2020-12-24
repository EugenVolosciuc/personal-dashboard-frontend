import React, { useCallback } from 'react'
import { useDragLayer } from 'react-dnd'
import get from 'lodash/get'

import DND_TYPES from 'constants/DND_TYPES'

const CustomDragLayer = () => {
  const {
    itemType,
    item,
    isDragging,
    clientOffset
  } = useDragLayer(monitor => ({
    itemType: monitor.getItemType(),
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset()
  }))

  const dragLayerStyling = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 10000,
    left: get(clientOffset, 'x', 0) - 50,
    top: get(clientOffset, 'y', 0) - 30,
    padding: '30px 20px',
    color: 'white',
    background: '#333'
  }

  const renderItem = () => {
    switch (itemType) {
      case DND_TYPES.WIDGET:
        return <div style={dragLayerStyling}>{item.title}</div>
      default:
        return null
    }
  }

  if (!isDragging) return null

  return (
    <>
      {renderItem()}
    </>
  )
}
export default CustomDragLayer