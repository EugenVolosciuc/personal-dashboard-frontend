import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import { EditorState, convertFromRaw } from 'draft-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAlert } from 'react-alert'
import { mutate as generalMutate } from 'swr'

import styles from 'components/widgets/styles/NotesListItem.module.scss'
import { Popover, Button, Select } from 'components/ui'
import useErrorHandler from 'utils/hooks/useErrorHandler'
import { useAuth } from 'utils/contexts/auth'
import useNotebooks from 'utils/hooks/useNotebooks'

dayjs.extend(relativeTime)

const DestinationNotebookSelector = ({ note, toggleMovePopover, handleMoveNote }) => {
  const [notebook, setNotebook] = useState(null)
  const { data } = useNotebooks()

  const options = (() => {
    if (!data) return []

    const filteredNotebooks = data.filter(notebook => notebook._id !== note.notebook)
    if (isEmpty(filteredNotebooks)) return []

    return filteredNotebooks.map(notebook => ({ value: notebook._id, label: notebook.title }))
  })()

  const handleChange = option => setNotebook(option)

  return (
    <div onClick={event => event.stopPropagation()}>
      {isEmpty(options)
        ? <p>You have no other notebooks to move this note to.</p>
        : <>
          <h5 className="font-bold text-left mb-2">Move note</h5>
          <Select options={options} value={notebook} onChange={handleChange} />
          <div className="flex justify-around mt-4">
            <Button onClick={toggleMovePopover} size="xs">Cancel</Button>
            <Button onClick={() => handleMoveNote(notebook.value)} disabled={!notebook} type="primary" size="xs">Move</Button>
          </div>
        </>
      }
    </div>
  )
}

// title, updatedAt, content
const NotesListItem = ({ note, mutate, handleNoteClick, lastItemRef, isSelected }) => {
  const [showDeletePopover, setShowDeletePopover] = useState(false)
  const [showMovePopover, setShowMovePopover] = useState(false)

  const { user } = useAuth()
  const errorHandler = useErrorHandler()
  const alert = useAlert()

  const toggleDeletePopover = event => {
    if (event) event.stopPropagation()
    setShowDeletePopover(!showDeletePopover)
  }

  const toggleMovePopover = event => {
    if (event) event.stopPropagation()
    setShowMovePopover(!showMovePopover)
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

  const handleMoveNote = async notebookID => {
    try {
      await axios.patch(`/notes/${note._id}`, { notebook: notebookID })
      mutate()
      generalMutate(['/notebooks', user._id])
      alert.success('Note moved succesfully!')
      toggleMovePopover()
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
        {content && <p className={styles.content}>{EditorState.createWithContent(convertFromRaw(JSON.parse(content))).getCurrentContent().getPlainText()}</p>}
        <p className="text-xs text-secondary pt-2">{dayjs(updatedAt).fromNow()}</p>
      </div>
      <div className={`flex flex-col justify-around items-center p-2 ${styles['actions-container']}`}>
        <Popover
          isOpen={showMovePopover}
          handleClose={toggleMovePopover}
          content={<DestinationNotebookSelector note={note} toggleMovePopover={toggleMovePopover} handleMoveNote={handleMoveNote} />}
        >
          <span onClick={toggleMovePopover}>
            <FontAwesomeIcon icon={faFileImport} size="sm" />
          </span>
        </Popover>
        <Popover
          isOpen={showDeletePopover}
          handleClose={toggleDeletePopover}
          content="Are you sure you want to delete this note?"
          actions={[
            <Button onClick={toggleDeletePopover} size="xs">No</Button>,
            <Button onClick={handleDeleteNote} size="xs">Yes</Button>
          ]}
        >
          <span onClick={toggleDeletePopover}>
            <FontAwesomeIcon icon={faTrash} className="text-red-500" size="sm" />
          </span>
        </Popover>
      </div>
    </div>
  )
}

export default NotesListItem
