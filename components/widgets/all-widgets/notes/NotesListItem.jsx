import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EditorState, convertFromRaw } from 'draft-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from 'components/widgets/styles/NotesListItem.module.scss'
import { Popover, Button } from 'components/ui'

dayjs.extend(relativeTime)

// title, updatedAt, content
const NotesListItem = ({ note, handleNoteClick, lastItemRef, isSelected }) => {
  const [showDeletePopover, setShowDeletePopover] = useState(false)
  const [showMoveModal, setShowMoveModal] = useState(false)

  const { title, updatedAt, content, _id } = note

  const toggleDeletePopover = event => {
    event.stopPropagation()
    setShowDeletePopover(!showDeletePopover)
  }

  const handleDeleteNote = () => {
    console.log("DELETING NOTE")
  }

  return (
    <div
      ref={lastItemRef}
      className={`flex h-24 justify-between mb-4 pb-2 cursor-pointer ${styles.note} ${isSelected ? styles.selected : ''}`}
      onClick={() => handleNoteClick(note)}
    >
      <div className="flex flex-col justify-between">
        <h5 className={`text-sm font-bold ${styles.title}`}>{title}</h5>
        {content && <p className={styles.fade}>{EditorState.createWithContent(convertFromRaw(JSON.parse(content))).getCurrentContent().getPlainText()}</p>}
        <p className="text-xs text-secondary pt-2">{dayjs(updatedAt).fromNow()}</p>
      </div>
      <div className={`flex flex-col justify-around items-center p-2 ${styles['actions-container']}`}>
        <FontAwesomeIcon icon={faFileImport} className="" size="sm" />
        <Popover
          isOpen={showDeletePopover}
          content="Are you sure you want to delete this note?"
          actions={[
            <Button onClick={handleDeleteNote} size="sm" danger>Yes</Button>,
            <Button onClick={toggleDeletePopover} size="sm">No</Button>
          ]}
        >
          <span onClick={toggleDeletePopover}>
            <FontAwesomeIcon icon={faTrash} className="text-red-500" size="sm" />
          </span>
        </Popover>
        {/* <Popover> */}
        {/* </Popover> */}
      </div>
    </div>
  )
}

export default NotesListItem
