import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetRemoveSetting from 'components/widgets/WidgetSettings/WidgetRemoveSetting'
import WidgetMoveSetting from 'components/widgets/WidgetSettings/WidgetMoveSetting'

const WidgetSettings = ({ widget, setWidgetIsMoving }) => {
  return (
    <div className={styles['widget-settings']}>
      <WidgetMoveSetting widget={widget} setWidgetIsMoving={setWidgetIsMoving} />
      <div className={styles.ball}>
        <FontAwesomeIcon icon={faCompress} size="xs" className="text-purple-500" />
      </div>
      <WidgetRemoveSetting widget={widget} />
    </div>
  )
}

export default WidgetSettings
