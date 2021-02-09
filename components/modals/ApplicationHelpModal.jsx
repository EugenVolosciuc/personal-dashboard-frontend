import React from 'react'

import { Modal, Button } from 'components/ui'

const HelpItem = ({ title, content }) => {
  return (
    <li className="mb-2">
      <h3 className="font-bold">{title}:</h3>
      <p>{content}</p>
    </li>
  )
}

const helpItems = [
  {
    title: "Positioning widgets",
    content: "To position widgets, drag a widget's title from the sidebar to one of the dots."
  },
  {
    title: "Moving widgets",
    content: "To move widgets around, hover over the upper left corner of a widget and drag the icon that appears."
  },
  {
    title: "Deleting widgets",
    content: "To delete a widget, hover over the upper right corner of a widget and click on the icon that appears."
  },
]

const ApplicationHelpModal = ({ isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={!!isOpen}
      handleClose={() => handleClose()}
    // width="w-64"
    >
      <div className="flex h-full flex-col">
        <ul>
          {helpItems.map((helpItem, index) => <HelpItem key={`help-item-${index}`} title={helpItem.title} content={helpItem.content} />)}
        </ul>
        <div className="pt-4 flex justify-around items-center">
          <Button type="primary" size="sm" onClick={() => handleClose()}>I'm a widget master now!</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ApplicationHelpModal
