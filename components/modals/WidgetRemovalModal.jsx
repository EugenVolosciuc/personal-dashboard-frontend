import React from 'react'

import { Modal, Button } from 'components/ui'

const WidgetRemovalModal = ({ widget, isOpen, handleConfirm, handleClose }) => {
  return (
    <Modal
      isOpen={!!isOpen}
      handleClose={() => handleClose()}
      width="w-64"
    >
      <div className="flex h-full flex-col">
        <p className="text-center">Are you sure you want to remove the <span className="capitalize">{widget.title}</span> widget?</p>
        <div className="pt-4 flex justify-around items-center">
          <Button size="sm" onClick={handleConfirm} danger>Yes</Button>
          <Button size="sm" onClick={() => handleClose()}>No</Button>
        </div>
      </div>
    </Modal>
  )
}

export default WidgetRemovalModal
