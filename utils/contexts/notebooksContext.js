import {useState, useEffect, createContext} from 'react'

import { useAuth } from 'utils/contexts/auth'
import { fetcher } from 'config/axios'
import useErrorHandler from 'utils/hooks/useErrorHandler'
import useSWR from 'swr'

const notebooksContext = createContext({
  data: null,
  error: null
})

export const NotebooksProvider = ({children}) => {
  const { user } = useAuth()
  const errorHandler = useErrorHandler()

  const { data, error, mutate, isValidating } = useSWR(
    user ? '/notebooks' : null, 
    url => fetcher(url, errorHandler)
  )

  return (
    <notebooksContext.Provider value={{ data, error, mutate, isValidating }}>
      {children}
    </notebooksContext.Provider>
  )
}

export default notebooksContext