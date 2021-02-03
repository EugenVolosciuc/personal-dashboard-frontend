import { createContext } from 'react'
import { useSWRInfinite } from 'swr'

import { fetcher } from 'config/axios'
import { useAuth } from 'utils/contexts/auth'
import useErrorHandler from 'utils/hooks/useErrorHandler'

const URL = '/notes'

const notesContext = createContext({
  data: null,
  error: null,
  size: 1,
  isValidating: false,
  hasNextPage: false
})

export const NotesProvider = ({children}) => {
  const { user } = useAuth()
  const errorHandler = useErrorHandler()

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    user ? index => `${URL}?page=${index + 1}` : null,
    url => fetcher(url, errorHandler)
  )

  const hasNextPage = data && !!data[data.length - 1].next
  const fetchNextPage = () => {
    setSize(size + 1)
  }

  return (
    <notesContext.Provider value={{data, error, mutate, size, setSize, isValidating, hasNextPage, fetchNextPage}}>
      {children}
    </notesContext.Provider>
  )
}

export default notesContext