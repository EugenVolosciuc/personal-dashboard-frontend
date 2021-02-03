import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import useNotes from 'utils/hooks/useNotes'

import { Card } from 'components/ui'
import { NotesModal } from 'components/widgets/modals'
import NotesList from 'components/widgets/all-widgets/notes/NotesList'

const NotesCard = () => {
  const [showNotesModal, setShowNotesModal] = useState(false) // true | false | note
  const swr = useNotes()

  const toggleNotesModal = note => setShowNotesModal(note)

  return (
    <Card
      title="Notes"
      extra={<FontAwesomeIcon onClick={() => toggleNotesModal(true)} icon={faPlus} className="icon-hover icon-hover-primary" />}
    >
      <NotesModal isOpen={showNotesModal} handleClose={toggleNotesModal} />
      <NotesList handleNoteClick={toggleNotesModal} swr={swr} />
    </Card>
  )
}

export default NotesCard
