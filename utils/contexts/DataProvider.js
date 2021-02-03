import React from 'react'

import { NotesProvider } from 'utils/contexts/notesContext'
import { TodosProvider } from 'utils/contexts/todosContext'
import { NotebooksProvider } from 'utils/contexts/notebooksContext'
import { AuthProvider } from 'utils/contexts/auth'

const DataProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotebooksProvider>
        <NotesProvider>
          <TodosProvider>
            {children}
          </TodosProvider>
        </NotesProvider>
      </NotebooksProvider>
    </AuthProvider>
  )
}

export default DataProvider
