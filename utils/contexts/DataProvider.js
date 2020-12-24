import React from 'react'

import { NotesProvider } from 'utils/contexts/notesContext'
import { AuthProvider } from 'utils/contexts/auth'

const DataProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotesProvider>
        {children}
      </NotesProvider>
    </AuthProvider>
  )
}

export default DataProvider
