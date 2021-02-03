import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import styles from 'components/widgets/styles/NotesListItem.module.scss'

dayjs.extend(relativeTime)

const NotebooksListItem = ({ notebook, handleClick }) => {
  return (
    <div onClick={() => handleClick(notebook)} className={`flex justify-between items-end cursor-pointer pt-3 pb-3 ${styles.note}`}>
      <p>{notebook.title} <span className="text-gray-400">({notebook.notes.length})</span></p>
      <p className="text-xs text-gray-400">{dayjs(notebook.updatedAt).fromNow()}</p>
    </div>
  )
}

export default NotebooksListItem