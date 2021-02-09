import React, { useRef } from 'react'

import { Loader, Button } from 'components/ui'
import NotesListItem from 'components/widgets/all-widgets/notes/NotesListItem'
import useIntersectionObserver from 'utils/hooks/useIntersectionObserver'
import useNotes from 'utils/hooks/useNotes'

const NotesList = ({ handleNoteClick, selectedNote, swr, showLoader }) => {
  const { data, error, mutate, isValidating, hasNextPage, fetchNextPage } = swr
  const lastItemRef = useRef()

  // useIntersectionObserver({
  //   target: lastItemRef,
  //   onIntersect: fetchNextPage,
  //   enabled: hasNextPage
  // })

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
      <span className="flex justify-center">
        {isValidating && showLoader && <Loader size="2x" />}
        {!isValidating && hasNextPage && <Button onClick={fetchNextPage} size="sm">Load more</Button>}
      </span>
    </>
  )
}

export default NotesList
