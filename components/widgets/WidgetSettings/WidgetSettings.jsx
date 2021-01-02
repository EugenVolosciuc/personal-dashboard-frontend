import React from 'react'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetRemoveSetting from 'components/widgets/WidgetSettings/WidgetRemoveSetting'
import WidgetMoveSetting from 'components/widgets/WidgetSettings/WidgetMoveSetting'
// import WidgetResizeSetting from 'components/widgets/WidgetSettings/WidgetResizeSetting'

const WidgetSettings = ({ widget, setWidgetIsMoving }) => {
  return (
    <div className={styles['widget-settings']}>
      <WidgetMoveSetting widget={widget} setWidgetIsMoving={setWidgetIsMoving} />
      {/* <WidgetResizeSetting widget={widget} /> */}
      <WidgetRemoveSetting widget={widget} />
    </div>
  )
}

export default WidgetSettings
