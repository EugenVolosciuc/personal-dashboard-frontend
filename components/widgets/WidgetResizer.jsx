import React from 'react'
import { useDrag } from 'react-dnd'

import styles from 'components/widgets/styles/WidgetResizerContainer.module.scss'
import DND_TYPES from 'constants/DND_TYPES'
import useWidgetResizeMode from 'utils/hooks/useWidgetResizeMode'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'

// side: 'vertical' | 'bottom'
const WidgetResizeBorder = ({ widget, orientation = 'vertical' }) => {
  const { toggleDashboardEditMode } = useDashboardEditMode()
  const { resizedWidget, toggleResizeWidgetMode } = useWidgetResizeMode()

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DND_TYPES.WIDGET_RESIZE_BORDER,
      orientation,
      widget
    },
    begin: () => {
      toggleDashboardEditMode()
      toggleResizeWidgetMode(widget._id)
    },
    end: () => {
      toggleDashboardEditMode()
      toggleResizeWidgetMode()
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return <div className={`${styles['resizer-container']} ${styles[orientation]}`}>
    <div className={styles.border} ref={drag} />
  </div>
}

export default WidgetResizeBorder
