import { useContext } from 'react'

import notesContext from 'utils/contexts/notesContext'

const useNotes = () => useContext(notesContext)

export default useNotes