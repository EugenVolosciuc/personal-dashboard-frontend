import React from 'react'
import { useDrop } from 'react-dnd'
import axios from 'axios'

import styles from 'components/gridSystem/styles/GridDot.module.scss'
import useGridSize from 'utils/hooks/useGridSize'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import DND_TYPES from 'constants/DND_TYPES'
import { getWidgetDotCoordinates, checkCanDrop } from 'utils/functions/grid'

const GridDot = () => {
  const { gridSize } = useGridSize()
  const { widgetPositions, mutate } = useWidgetPositions()

  const [collectedProps, drop] = useDrop({
    accept: DND_TYPES.WIDGET,
    drop: async (item, monitor) => {
      const dropTarget = document.querySelector(`#${monitor.targetId}`)
      const widget = monitor.getItem()
      const widgetTitle = widget.title.toLowerCase()
      const dotCoordinates = getWidgetDotCoordinates(dropTarget)

      await saveWidgetPosition(widgetTitle, dotCoordinates, widget.defaultWidth, widget.defaultHeight)
    },
    canDrop: (item, monitor) => {
      const widget = monitor.getItem()
      const dropTarget = document.querySelector(`#${monitor.targetId}`)

      const dotCoordinates = getWidgetDotCoordinates(dropTarget)
      return checkCanDrop(gridSize, dotCoordinates, widgetPositions, widget.defaultWidth, widget.defaultHeight) // TODO: change minWidth and minHeight to be specified by the widget
    },
    collect: monitor => monitor
  })

  const saveWidgetPosition = async (title, coordinates, width, height) => {
    try {
      await axios.post('/widget-positions', { title, type: title, x: coordinates.x, y: coordinates.y, gridSize: gridSize.id, width, height })
      mutate()
    } catch (error) {
      console.log("ERROR SAVING NEW WIDGET POSITION", error)
    }
  }

  return <span ref={drop} className={styles['grid-dot']} id={collectedProps.targetId} />
}

export default GridDot
