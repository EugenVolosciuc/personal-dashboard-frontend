import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EditorState, convertFromRaw } from 'draft-js'

import styles from 'components/widgets/styles/NotesListItem.module.scss'

dayjs.extend(relativeTime)

// title, updatedAt, content
const NotesListItem = ({ note, handleNoteClick, lastItemRef, isSelected }) => {
  const { title, updatedAt, content, _id } = note
  
  return (
    <div 
      ref={lastItemRef}
      className={`flex flex-col h-24 justify-between mb-4 pb-2 cursor-pointer ${styles.note} ${isSelected ? styles.selected : ''}`} 
      onClick={() => handleNoteClick(note)}
    >
      <h5 className={`text-sm font-bold ${styles.title}`}>{title}</h5>
      {content && <p className={styles.fade}>{EditorState.createWithContent(convertFromRaw(JSON.parse(content))).getCurrentContent().getPlainText()}</p>}
      <p className="text-xs text-secondary pt-2">{dayjs(updatedAt).fromNow()}</p>
    </div>
  )
}

export default NotesListItem
