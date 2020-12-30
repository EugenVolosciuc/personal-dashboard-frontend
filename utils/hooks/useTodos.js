import { useContext } from 'react'

import todosContext from 'utils/contexts/todosContext'

const useTodos = () => {
  return useContext(todosContext)
}

export default useTodos