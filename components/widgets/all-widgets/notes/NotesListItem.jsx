import React, { useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EditorState, convertFromRaw } from 'draft-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAlert } from 'react-alert'
import { mutate as generalMutate } from 'swr'

import styles from 'components/widgets/styles/NotesListItem.module.scss'
import { Popover, Button } from 'components/ui'
import useErrorHandler from 'utils/hooks/useErrorHandler'
import { useAuth } from 'utils/contexts/auth'

dayjs.extend(relativeTime)

// title, updatedAt, content
const NotesListItem = ({ note, mutate, handleNoteClick, lastItemRef, isSelected }) => {
  const [showDeletePopover, setShowDeletePopover] = useState(false)
  const [showMoveModal, setShowMoveModal] = useState(false)

  const { user } = useAuth()
  const errorHandler = useErrorHandler()
  const alert = useAlert()

  const toggleDeletePopover = event => {
    event.stopPropagation()
    setShowDeletePopover(!showDeletePopover)
  }

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`/notes/${note._id}`)
      mutate()
      generalMutate(['/notebooks', user._id])
      alert.success('Note deleted succesfully!')
    } catch (error) {
      errorHandler(error)
    }
  }

  const { title, updatedAt, content, _id } = note

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
          handleClose={toggleDeletePopover}
          content="Are you sure you want to delete this note?"
          actions={[
            <Button onClick={handleDeleteNote} size="sm">Yes</Button>,
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
