import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress } from '@fortawesome/free-solid-svg-icons'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import useWidgetResizeMode from 'utils/hooks/useWidgetResizeMode'

const WidgetResizeSetting = ({ widget }) => {
  const { resizedWidget, toggleResizeWidgetMode } = useWidgetResizeMode()

  return (
    <div className={styles.ball} onClick={() => resizedWidget === widget._id ? toggleResizeWidgetMode() : toggleResizeWidgetMode(widget._id)}>
      <FontAwesomeIcon icon={faCompress} size="xs" className="text-purple-500" />
    </div>
  )
}

export default WidgetResizeSetting
