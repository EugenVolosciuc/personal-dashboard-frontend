import { useContext } from 'react'

import notebooksContext from 'utils/contexts/notebooksContext'

const useNotebooks = () => useContext(notebooksContext)

export default useNotebooks