import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCompress, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

import styles from 'components/widgets/styles/WidgetPositioner.module.scss'
import WidgetRemovalModal from 'components/modals/WidgetRemovalModal'
import useWidgetPositions from 'utils/hooks/useWidgetPositions'

const WidgetSettings = ({ widget }) => {
  const [showWidgetRemovalModal, setShowWidgetRemovalModal] = useState(false)
  const { mutate } = useWidgetPositions()

  const toggleWidgetRemovalModal = () => setShowWidgetRemovalModal(!showWidgetRemovalModal)

  const handleRemoveWidget = async () => {
    try {
      await axios.delete(`/widget-positions/${widget._id}`)
      mutate()
    } catch (error) {
      console.log("ERROR REMOVING WIDGET", error)
    }
  }

  return (
    <div className={styles['widget-settings']}>
      <WidgetRemovalModal
        widget={widget}
        isOpen={showWidgetRemovalModal}
        handleClose={toggleWidgetRemovalModal}
        handleConfirm={handleRemoveWidget}
      />
      <div className={styles.ball}>
        <FontAwesomeIcon icon={faArrowsAlt} size="xs" className="text-purple-500" />
      </div>
      <div className={styles.ball}>
        <FontAwesomeIcon icon={faCompress} size="xs" className="text-purple-500" />
      </div>
      <div className={styles.ball} onClick={toggleWidgetRemovalModal}>
        <FontAwesomeIcon icon={faTrashAlt} size="xs" className="text-red-600" />
      </div>
    </div>
  )
}

export default WidgetSettings
