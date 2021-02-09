import React, { useRef } from 'react'
import isEmpty from 'lodash/isEmpty'

import { Loader, Button, Empty } from 'components/ui'
import NotesListItem from 'components/widgets/all-widgets/notes/NotesListItem'

const noNotesContent = <span>You have no notes. <br /> Add a new note by clicking on the plus icon.</span>

const NotesList = ({ handleNoteClick, selectedNote, swr, showLoader }) => {
  const { data, error, mutate, isValidating, hasNextPage, fetchNextPage } = swr
  const lastItemRef = useRef()

  if (!data) return null

  return (
    <>
      {data.map(group => {
        return group.notes.map((note, noteIndex) => {
          const isLastItem = noteIndex === group.notes.length - 1

          return <NotesListItem 
            key={note._id}
            note={note}
            mutate={mutate}
            isSelected={note._id === selectedNote?._id}
            handleNoteClick={handleNoteClick}
            lastItemRef={isLastItem ? lastItemRef : null}
          />
        })
      })}
      {isEmpty(data[0].notes) && !isValidating && <Empty content={noNotesContent} />}
      <span className="flex justify-center">
        {isValidating && showLoader && <Loader size="2x" />}
        {!isValidating && hasNextPage && <Button onClick={fetchNextPage} size="sm">Load more</Button>}
      </span>
    </>
  )
}

export default NotesList
