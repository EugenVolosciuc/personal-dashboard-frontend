import React from 'react'

import { NotesProvider } from 'utils/contexts/notesContext'
import { TodosProvider } from 'utils/contexts/todosContext'
import { AuthProvider } from 'utils/contexts/auth'

const DataProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotesProvider>
        <TodosProvider>
          {children}
        </TodosProvider>
      </NotesProvider>
    </AuthProvider>
  )
}

export default DataProvider
