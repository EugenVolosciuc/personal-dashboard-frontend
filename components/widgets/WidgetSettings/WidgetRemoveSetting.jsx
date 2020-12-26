import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import useWidgetPositions from 'utils/hooks/useWidgetPositions'
import WidgetRemovalModal from 'components/modals/WidgetRemovalModal'
import styles from 'components/widgets/styles/WidgetPositioner.module.scss'

const WidgetRemovalSetting = ({ widget }) => {
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
    <div className={styles.ball} onClick={toggleWidgetRemovalModal}>
      <WidgetRemovalModal
        widget={widget}
        isOpen={showWidgetRemovalModal}
        handleClose={toggleWidgetRemovalModal}
        handleConfirm={handleRemoveWidget}
      />
      <FontAwesomeIcon icon={faTrashAlt} size="xs" className="text-red-600" />
    </div>
  )
}

export default WidgetRemovalSetting
