import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import isObject from 'lodash/isObject'

import { Card } from 'components/ui'
import { NotesModal } from 'components/widgets/modals'
import NotesList from 'components/widgets/notes/NotesList'

const NotesCard = () => {
  const [showNotesModal, setShowNotesModal] = useState(false) // true | false | note

  const toggleNotesModal = note => setShowNotesModal(note)

  return (
    <Card
      style={{ height: 600 }}
      title="Notes"
      extra={<FontAwesomeIcon onClick={() => toggleNotesModal(true)} icon={faPlus} className="icon-hover icon-hover-primary" />}
    >
      <NotesModal isOpen={showNotesModal} handleClose={toggleNotesModal} />
      <NotesList handleNoteClick={toggleNotesModal} />
    </Card>
  )
}

export default NotesCard
