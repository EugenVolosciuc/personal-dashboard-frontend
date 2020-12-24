import React from 'react'
import { useDrag } from 'react-dnd'

import DND_TYPES from 'constants/DND_TYPES'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'

const getStyles = isDragging => {
  return {
    position: 'absolute',
    display: isDragging ? 'none' : 'initial',
  }
}

const DragableMenuItem = ({ item }) => {
  const { dashboardEditMode, toggleDashboardEditMode } = useDashboardEditMode()

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DND_TYPES.WIDGET,
      title: item.title,
      component: item.component
    },
    begin: () => toggleDashboardEditMode(),
    end: () => toggleDashboardEditMode(),
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return (
    <p ref={drag} className="font-bold cursor-pointer bg-transparent" style={getStyles(isDragging)}>{item.title}</p>
  )
}

export default DragableMenuItem
