import React from 'react'
import { useDrop } from 'react-dnd'
import axios from 'axios'

import styles from 'components/gridSystem/styles/GridDot.module.scss'
import useGridSize from 'utils/hooks/useGridSize'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import useWidgetResizeMode from 'utils/hooks/useWidgetResizeMode'
import DND_TYPES from 'constants/DND_TYPES'
import { getWidgetDotCoordinates, checkCanDrop } from 'utils/functions/grid'

const GridDot = () => {
  const { gridSize } = useGridSize()
  const { widgetPositions, mutate } = useWidgetPositions()
  const { isResizing } = useWidgetResizeMode()

  const [collectedProps, drop] = useDrop({
    accept: DND_TYPES.WIDGET,
    drop: async (item, monitor) => {
      const dropTarget = document.querySelector(`#${monitor.targetId}`)
      const widget = monitor.getItem()
      const widgetTitle = widget.title.toLowerCase()
      const dotCoordinates = getWidgetDotCoordinates(dropTarget)

      const updateWidget = !!item._id

      if (updateWidget) {
        await updateWidgetPosition(item._id, dotCoordinates)
      } else {
        await saveNewWidgetPosition(widgetTitle, dotCoordinates, widget.defaultWidth, widget.defaultHeight)
      }
    },
    canDrop: (item, monitor) => {
      const widget = monitor.getItem()
      const dropTarget = document.querySelector(`#${monitor.targetId}`)
      const dotCoordinates = getWidgetDotCoordinates(dropTarget)

      const updateWidget = !!item._id

      return checkCanDrop(
        gridSize, 
        dotCoordinates, 
        widgetPositions, 
        updateWidget ? item.width : widget.defaultWidth, 
        updateWidget ? item.height : widget.defaultHeight, 
        updateWidget ? item : null)
    },
    collect: monitor => monitor
  })

  const saveNewWidgetPosition = async (title, coordinates, width, height) => {
    try {
      await axios.post('/widget-positions', { title, type: title, x: coordinates.x, y: coordinates.y, gridSize: gridSize.id, width, height })
      mutate()
    } catch (error) {
      console.log("ERROR SAVING NEW WIDGET POSITION", error)
    }
  }

  const updateWidgetPosition = async (id, coordinates) => {
    try {
      await axios.patch(`/widget-positions/${id}`, { x: coordinates.x, y: coordinates.y })
      mutate()
    } catch (error) {
      console.log("ERROR UPDATING WIDGET POSITION", error)
    }
  }

  return <span 
    ref={drop} 
    className={`${styles['grid-dot']} ${isResizing ? styles['is-resizing'] : ''}`} 
    id={collectedProps.targetId} 
  />
}

export default GridDot
