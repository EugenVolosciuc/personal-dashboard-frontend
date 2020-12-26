import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { useDrag } from 'react-dnd'

import DND_TYPES from 'constants/DND_TYPES'
import WIDGET_LIST from 'constants/WIDGET_LIST'
import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import useDashboardEditMode from 'utils/hooks/useDashboardEditMode'

const WidgetMoveSetting = ({ widget, setWidgetIsMoving }) => {
  const { toggleDashboardEditMode } = useDashboardEditMode()
  const { mutate } = useWidgetPositions()

  const [collectedProps, drag] = useDrag({
    item: {
      ...widget,
      component: WIDGET_LIST[widget.title],
      type: DND_TYPES.WIDGET
    },
    begin: () => {
      setWidgetIsMoving(true)
      toggleDashboardEditMode()
    },
    end: () => {
      setWidgetIsMoving(false)
      toggleDashboardEditMode()
    }
  })

  return (
    <div ref={drag} className={styles.ball}>
      <FontAwesomeIcon icon={faArrowsAlt} size="xs" className="text-purple-500" />
    </div>
  )
}

export default WidgetMoveSetting
