import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import isObject from 'lodash/isObject'
import { EditorState, convertToRaw } from 'draft-js'

import styles from 'components/widgets/styles/NotesModal.module.scss'
import { Modal, ClearInput } from 'components/ui'
import Editor from 'components/misc/Editor'
import useNotes from 'utils/hooks/useNotes'
import NotesList from 'components/widgets/all-widgets/notes/NotesList'

let titleCancelToken
let contentCancelToken
const emptyEditorContent = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))

const NoteModal = ({ isOpen, handleClose }) => {
  const [note, setNote] = useState(null)
  const [content, setContent] = useState(emptyEditorContent)
  const [title, setTitle] = useState('')

  const { mutate } = useNotes()

  const setSelectedNote = selectedNote => {
    setNote(selectedNote)
    setTitle(selectedNote.title)
    setContent(selectedNote.content)
  }

  const createNewNote = async () => {
    try {
      const { data } = await axios.post(
        '/notes',
        {
          title: 'Untitled note',
          content: emptyEditorContent
        }
      )
      mutate()
      setSelectedNote(data)
    } catch (error) {
      console.log("ERROR CREATING NEW NOTE", error)
    }
  }

  const handleTitleChange = async value => {
    setTitle(value)

    if (typeof titleCancelToken != typeof undefined) {
      titleCancelToken.cancel()
    }

    titleCancelToken = axios.CancelToken.source()

    try {
      await axios.patch(
        `/notes/${note._id}`,
        { title: value },
        { cancelToken: titleCancelToken.token }
      )
      mutate()
    } catch (error) {
      if (axios.isCancel(error)) return
      console.log("ERROR UPDATING TITLE", error)
    }
  }

  const handleContentChange = async newContent => {
    // setContent(newContent) // Probably not needed, as it creates strange behaviour

    if (typeof contentCancelToken != typeof undefined) {
      contentCancelToken.cancel()
    }

    contentCancelToken = axios.CancelToken.source()

    try {
      await axios.patch(
        `/notes/${note._id}`,
        { content: newContent },
        { cancelToken: contentCancelToken.token }
      )
      mutate()
    } catch (error) {
      if (axios.isCancel(error)) return
      console.log("ERROR UPDATING TITLE", error)
    }
  }

  useEffect(() => {
    if (isObject(isOpen)) setSelectedNote(isOpen)
  }, [isOpen])

  return (
    <Modal
      isOpen={!!isOpen}
      handleClose={() => handleClose()}
      width={styles.width}
      height={styles.height}
    >
      <div className="flex h-full">
        <div className={`h-full flex flex-col border-secondary pr-4 ${styles.list} ${note ? styles['show-editor'] : ''}`}>
          <header className="flex-shrink mb-4 flex justify-between items-center">
            <h3 className="font-bold text-2xl">Notes</h3>
            <div>
              <FontAwesomeIcon onClick={createNewNote} icon={faPlus} className="icon-hover icon-hover-primary" />
            </div>
          </header>
          <div className="overflow-y-auto flex-grow">
            <NotesList handleNoteClick={setSelectedNote} selectedNote={note} />
          </div>
        </div>
        <div className={`flex flex-col pl-4 h-full ${styles['editor-container']} ${note ? styles['show-editor'] : ''}`}>
          <ClearInput value={title} handleChange={handleTitleChange} placeholder="Enter note title" />
          <div className="flex-grow mt-2">
            <Editor
              defaultContent={content}
              handleChange={handleContentChange}
              wrapperClassName="h-full"
              placeholder="Enter note content"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NoteModal
