import React from 'react'
import { useDrop } from 'react-dnd'
import axios from 'axios'

import styles from 'components/grid-system/styles/GridPillar.module.scss'
import DND_TYPES from 'constants/DND_TYPES'
import { getWidgetPillarIndex } from 'utils/functions/grid'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import useWidgetResizeMode from 'utils/hooks/useWidgetResizeMode'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'

// orientation: 'horizontal' | 'vertical'
const GridPillar = ({ orientation = 'horizontal' }) => {
  const { mutate } = useWidgetPositions()
  const { isResizing } = useWidgetResizeMode()
  const { dashboardEditMode } = useDashboardEditMode()

  const [collectedProps, drop] = useDrop({
    accept: DND_TYPES.WIDGET_RESIZE_BORDER,
    drop: async (item, monitor) => {
      const dropTarget = document.querySelector(`#${monitor.targetId}`)
      const pillarCoordinates = getWidgetPillarIndex(dropTarget, orientation)

      await updateWidgetPosition(
        item.widget._id,
        orientation === 'horizontal'
          ? { height: pillarCoordinates - item.widget.y }
          : { width: pillarCoordinates - item.widget.x }
      )
    },
    canDrop: (item, monitor) => {
      return item.orientation === orientation
    },
    collect: monitor => monitor
  })

  const updateWidgetPosition = async (id, size) => {
    try {
      await axios.patch(`/widget-positions/${id}`, {
        ...(size.width && { width: size.width }),
        ...(size.height && { height: size.height })
      })
      mutate()
    } catch (error) {
      console.log("ERROR UPDATING WIDGET POSITION", error)
    }
  }

  return <div
    id={collectedProps.targetId}
    ref={drop}
    className={`${styles['grid-pillar']} ${orientation === 'vertical' ? styles.vertical : styles.horizontal} ${isResizing ? styles['is-resizing'] : ''} ${dashboardEditMode ? styles['in-edit-mode'] : ''}`}
  />
}

export default GridPillar
