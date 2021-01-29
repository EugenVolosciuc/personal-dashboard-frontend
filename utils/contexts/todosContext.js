import { createContext } from 'react'
import useSWR, { useSWRInfinite } from 'swr'
import axios from 'axios'

import { useAuth } from 'utils/contexts/auth'

const todosContext = createContext({
  data: null,
  error: null,
  size: 1,
  isValidating: false,
  hasNextPage: false
})

const fetchTodos = async (url, completed) => {
  const { data } = await axios.get(url, {
    params: {
      filters: {
        completed
      }
    }
  })

  return data
}

export const TodosProvider = ({ children }) => {
  const { user } = useAuth()

  const {
    data: nonCompletedTodos,
    mutate: mutateNonCompletedTodos,
    isValidating: nonCompletedTodosAreValidating,
    error: nonCompletedTodosError
  } = useSWR(user ? '/todos' : null, url => fetchTodos(url, false))

  const {
    data: completedTodos,
    error: completedTodosError,
    mutate: mutateCompletedTodos,
    size: completedTodosSize,
    setSize: setCompletedTodosSize,
    isValidating: completedTodosAreValidating
  } = useSWRInfinite(
    user ? index => `/todos?page=${index + 1}` : null,
    url => fetchTodos(url, true)
  )

  const completedTodosHaveNextPage = completedTodos && !!completedTodos[completedTodos.length - 1].next
  const fetchCompletedTodosNextPage = () => setSize(size + 1)

  const contextValue = {
    nonCompletedTodos,
    mutateNonCompletedTodos,
    nonCompletedTodosAreValidating,
    nonCompletedTodosError,
    completedTodos,
    completedTodosError,
    mutateCompletedTodos,
    completedTodosSize,
    setCompletedTodosSize,
    completedTodosAreValidating,
    completedTodosHaveNextPage,
    fetchCompletedTodosNextPage
  }

  return (
    <todosContext.Provider value={contextValue}>
      {children}
    </todosContext.Provider>
  )
}

export default todosContext