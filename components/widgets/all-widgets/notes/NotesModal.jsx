import React, { useState, useEffect } from 'react'
import axios from 'axios'
import isObject from 'lodash/isObject'
import { EditorState, convertToRaw } from 'draft-js'
import { useSWRInfinite } from 'swr'

import { fetcher } from 'config/axios'
import styles from 'components/widgets/styles/NotesModal.module.scss'
import { Modal, ClearInput } from 'components/ui'
import NotesModalSidebar from 'components/widgets/all-widgets/notes/NotesModalSidebar'
import Editor from 'components/misc/Editor'
import useNotes from 'utils/hooks/useNotes'
import useNotebooks from 'utils/hooks/useNotebooks'
import useErrorHandler from 'utils/hooks/useErrorHandler'
import { useAuth } from 'utils/contexts/auth'

let titleCancelToken
let contentCancelToken
const emptyEditorContent = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))

const NoteModal = ({ isOpen, handleClose }) => {
  const [notebook, setNotebook] = useState(null)
  const [note, setNote] = useState(null)
  const [content, setContent] = useState(emptyEditorContent)
  const [title, setTitle] = useState('')

  const { user } = useAuth()
  const errorHandler = useErrorHandler()
  const { data } = useNotebooks()
  const { mutate: mutateNotes } = useNotes() // all notes

  const swr = useSWRInfinite( // notes per notebook
    user && notebook ? index => ([`/notes?page=${index + 1}`, notebook._id]) : null,
    (url, notebookID) => fetcher(
      url, 
      { filters: { notebook: notebookID } }, 
      errorHandler
    )
  )

  const hasNextPage = swr.data && !!swr.data[swr.data.length - 1].next
  const fetchNextPage = () => {
    swr.setSize(swr.size + 1)
  }

  swr.hasNextPage = hasNextPage
  swr.fetchNextPage = fetchNextPage


  const setSelectedNote = selectedNote => {
    if (selectedNote) {
      setNote(selectedNote)
      setTitle(selectedNote.title)
      setContent(selectedNote.content)
    } else {
      setNote(null)
      setTitle('')
      setContent(emptyEditorContent)
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
      mutateNotes() // mutate all notes
      swr.mutate() // mutate notebook notes
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleContentChange = async newContent => {
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
      mutateNotes() // mutate all notes
      swr.mutate() // mutate notebook notes
    } catch (error) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    if (isObject(isOpen)) {
      setSelectedNote(isOpen)
      setNotebook(data.find(queriedNotebook => queriedNotebook._id === isOpen.notebook))
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={!!isOpen}
      handleClose={() => handleClose()}
      width={styles.width}
      height={styles.height}
    >
      <div className="flex h-full">
        <NotesModalSidebar
          notebookNotes={swr}
          notebook={notebook}
          setNotebook={setNotebook}
          selectedNote={note}
          setSelectedNote={setSelectedNote}
          mutateNotes={mutateNotes}
          emptyEditorContent={emptyEditorContent}
        />
        <div className={`flex flex-col pl-4 h-full ${styles['editor-container']}`}>
          {note
            ? <>
              <ClearInput value={title} handleChange={handleTitleChange} placeholder="Enter note title" />
              <div className="flex-grow mt-2">
                <Editor
                  defaultContent={content}
                  handleChange={handleContentChange}
                  wrapperClassName="h-full"
                  placeholder="Enter note content"
                />
              </div>
            </>
            : <div className="w-full h-full flex justify-center items-center">
              <p className="text-center text-lg font-medium text-secondary">Add a new note or click on an existing one to edit it.</p>
            </div>
          }
        </div>
      </div>
    </Modal>
  )
}

export default NoteModal
