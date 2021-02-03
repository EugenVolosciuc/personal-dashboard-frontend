import React from 'react'

import useNotebooks from 'utils/hooks/useNotebooks'
import NotebooksListItem from 'components/widgets/all-widgets/notes/NotebooksListItem'

const NotebooksList = ({ setNotebook }) => {
  const { data } = useNotebooks()

  const handleNotebookClick = () => {

  }

  if (!data) return null

  return (
    <>
      {data.map(notebook => {
        return <NotebooksListItem key={notebook.title + '-notebook'} notebook={notebook} handleClick={setNotebook} />
      })}
    </>
  )
}

export default NotebooksList
