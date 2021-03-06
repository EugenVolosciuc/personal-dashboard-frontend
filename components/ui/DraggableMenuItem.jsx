import React from 'react'
import { useDrag } from 'react-dnd'

import DND_TYPES from 'constants/DND_TYPES'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import { checkCanDrag } from 'utils/functions/grid'

const DraggableMenuItem = ({ item }) => {
  const { toggleDashboardEditMode } = useDashboardEditMode()
  const { widgetPositions } = useWidgetPositions()

  const canDrag = checkCanDrag(item.title, widgetPositions)

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DND_TYPES.WIDGET,
      ...item
    },
    begin: () => toggleDashboardEditMode(),
    end: () => toggleDashboardEditMode(),
    canDrag: () => canDrag,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return (
    <p 
      ref={drag} 
      className={`font-bold cursor-pointer bg-transparent absolute ${isDragging ? 'hidden' : 'block'} ${canDrag ? '' : 'text-gray-300 cursor-not-allowed'}`}>
      {item.title}
    </p>
  )
}

export default DraggableMenuItem
