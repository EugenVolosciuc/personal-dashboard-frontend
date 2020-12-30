import React from 'react'

import useTodos from 'utils/hooks/useTodos'

const NonCompletedTodosList = () => {
  const { nonCompletedTodos } = useTodos()

  console.log("nonCompletedTodos", nonCompletedTodos)

  return (
    <div>
      
    </div>
  )
}

export default NonCompletedTodosList
