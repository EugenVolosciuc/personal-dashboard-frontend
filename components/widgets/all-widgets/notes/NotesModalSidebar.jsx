import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { SingleFormInput } from 'components/ui'

import styles from 'components/widgets/styles/NotesModal.module.scss'
import NotesList from 'components/widgets/all-widgets/notes/NotesList'
import NotebooksList from 'components/widgets/all-widgets/notes/NotebooksList'
import useErrorHandler from 'utils/hooks/useErrorHandler'
import useNotebooks from 'utils/hooks/useNotebooks'

const NotesModalSidebar = ({ notebook, setNotebook, notebookNotes, selectedNote, setSelectedNote, mutateNotes, emptyEditorContent }) => {
  const [showNewNotebookInput, setShowNewNotebookInput] = useState(false)
  const { mutate } = useNotebooks()
  const errorHandler = useErrorHandler()

  const toggleNewNotebookInput = () => setShowNewNotebookInput(!showNewNotebookInput)
  const createNewNote = async () => {
    try {
      const { data } = await axios.post(
        '/notes',
        {
          title: 'Untitled note',
          content: emptyEditorContent,
          notebook: notebook._id
        }
      )
      mutateNotes()
      notebookNotes.mutate()
      setSelectedNote(data)
    } catch (error) {
      errorHandler(error)
    }
  }

  const createNewNotebook = async title => {
    try {
      await axios.post('/notebooks', { title })
      toggleNewNotebookInput()
      mutate()
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleBack = () => {
    setNotebook(null)
    setSelectedNote()
  }

  return (
    <div className={`h-full flex flex-col border-secondary pr-4 ${styles.list}`}>
      <header className="flex-shrink mb-4 flex justify-between items-center">
        <h3 className="font-bold text-2xl">
          {notebook
            ? <>
              <FontAwesomeIcon
                size="xs"
                className="mr-3 cursor-pointer"
                onClick={handleBack}
                icon={faArrowLeft}
              />
              {notebook.title}
            </>
            : "Notebooks"
          }
        </h3>
        <div>
          <FontAwesomeIcon
            onClick={notebook ? createNewNote : toggleNewNotebookInput}
            icon={showNewNotebookInput ? faMinus : faPlus}
            className="icon-hover icon-hover-primary"
          />
        </div>
      </header>
      {showNewNotebookInput &&
        <SingleFormInput handleClick={createNewNotebook} placeholder="Notebook title" btnContent="Add" />
      }
      <div className="overflow-y-auto flex-grow">
        {notebook
          ? <div className="mt-4">
            <NotesList handleNoteClick={setSelectedNote} selectedNote={selectedNote} swr={notebookNotes} />
          </div>
          : <NotebooksList
            setNotebook={notebook => {
              if (showNewNotebookInput) setShowNewNotebookInput(!showNewNotebookInput)
              setNotebook(notebook)
            }}
          />
        }
      </div>
    </div>
  )
}

export default NotesModalSidebar
